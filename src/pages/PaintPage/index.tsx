import { MouseEventHandler, useEffect, useRef } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { onValue, ref, set } from 'firebase/database';
import { database } from '../../firebase.ts';
import { useAuth } from '../../store/hooks/useAuth.ts';
import { clearCanvas } from './helpers/toolbarHelpers.ts';
import Toolbar from '../../modules/Toolbar';
import BrushSizeRange from '../../components/BrushSizeRange';
import DrawingCanvas, {
  ExtendedCanvasRenderingContext2D,
} from '../../components/DrawingCanvas';
import './PaintPage.styles.scss';

function PaintPage() {
  const { imageId } = useParams();
  const { userId } = useAuth();

  const navigate = useNavigate();

  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const ctxRef = useRef<null | ExtendedCanvasRenderingContext2D>(null);

  const [searchParams, setSearchParams] = useSearchParams();

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const lineWidthParam =
    searchParams.get('lineWidth') ??
    JSON.parse(localStorage.getItem('miniPaintToolData'))?.lineWidth ??
    5;
  const lineColorParam =
    searchParams.get('lineColor') ??
    JSON.parse(localStorage.getItem('miniPaintToolData'))?.lineColor ??
    '#000000';
  const toolParam =
    searchParams.get('tool') ??
    JSON.parse(localStorage.getItem('miniPaintToolData'))?.tool ??
    'brush';

  const onToolbarButtonClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const pressedButtonId = event.target.closest('button').id;
    switch (pressedButtonId) {
      case 'save':
        saveCanvasData();
        handleSubmit(onSubmit)(event);
        break;
      case 'clear':
        clearCanvas(ctxRef.current!, canvasRef.current!);
        saveCanvasData();
        break;
    }
  };

  const onSubmit = (data) => {
    if (imageId) {
      set(ref(database, userId + '/pictures/' + imageId), {
        imageUrl: data.canvas,
        imageId,
        name: data.name,
      });
    } else {
      const newImageId = Date.now();
      set(ref(database, userId + '/pictures/' + `/${newImageId}`), {
        imageUrl: data.canvas,
        imageId: newImageId,
        name: data.name,
      });
      navigate({
        pathname: `/paint/${newImageId}`,
        search: `?lineWidth=${lineWidthParam}&lineColor=${encodeURIComponent(lineColorParam)}&tool=${toolParam}`,
      });
    }
  };

  const saveCanvasData = () => {
    const dataURL = canvasRef.current!.toDataURL('image/png');
    setValue('canvas', dataURL);
  };

  const changeSearchParam = (param, value) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(param, value);
    setSearchParams(newParams);
  };

  const setCanvasBrushSize = (value) => {
    const context = ctxRef.current as ExtendedCanvasRenderingContext2D;
    context.lineWidth = value;
  };

  const setCanvasColor = (value) => {
    const context = ctxRef.current as ExtendedCanvasRenderingContext2D;
    context.strokeStyle = value;
  };

  useEffect(() => {
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.width = 450;
    canvas.height = 450;

    const ctx = canvas.getContext?.('2d') as ExtendedCanvasRenderingContext2D;

    if (imageId) {
      onValue(ref(database, userId + '/pictures/' + imageId), (snapshot) => {
        const data = snapshot.val();
        const img = new Image();
        img.src = data.imageUrl;
        ctx.drawImage(img, 0, 0);
        setValue('name', data.name);
        setValue('canvas', data.imageUrl);
      });
    } else {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.lineCap = 'round';
    ctx.strokeStyle = lineColorParam;
    ctx.lineWidth = Number(lineWidthParam);

    ctxRef.current = ctx;

    if (localStorage.getItem('miniPaintToolData')) {
      const { lineWidth, lineColor, tool } = JSON.parse(
        localStorage.getItem('miniPaintToolData')
      );
      setSearchParams({ lineWidth, lineColor, tool });
    }
  }, [canvasRef]);

  useEffect(() => {
    return () => {
      localStorage.setItem(
        'miniPaintToolData',
        JSON.stringify({
          lineWidth: lineWidthParam,
          lineColor: lineColorParam,
          tool: toolParam,
        })
      );
    };
  }, [lineWidthParam, lineColorParam, toolParam]);

  return (
    <div className={'paint-page'}>
      <BrushSizeRange
        initialValue={Number(lineWidthParam) || 5}
        onChange={changeSearchParam}
        onCanvasChange={setCanvasBrushSize}
      />
      <Toolbar
        onToolbarButtonClick={onToolbarButtonClick}
        toolParam={toolParam}
        setParams={changeSearchParam}
        initialColorValue={lineColorParam || '#000000'}
        setCanvasColor={setCanvasColor}
      />

      <div className={'paint-page__content'}>
        <form className="drawing-form">
          <DrawingCanvas
            register={register}
            canvasRef={canvasRef}
            contextRef={ctxRef}
            initialTool={toolParam}
          />

          <input
            {...register('name', {
              required: true,
              minLength: 1,
              maxLength: 20,
              validate: {
                noSpaces: (value: string) => {
                  return (
                    value.trim().length === value.length ||
                    'Title cannot begin or end with spaces'
                  );
                },
              },
            })}
            className="drawing-form__input"
            placeholder="Image name"
          />
          {errors.name?.message && (
            <span className="title-error">{errors.name?.message}</span>
          )}
        </form>
      </div>
    </div>
  );
}

export default PaintPage;
