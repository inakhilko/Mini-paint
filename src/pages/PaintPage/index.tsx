import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { onValue, ref, set } from 'firebase/database';
import { database } from '../../firebase.ts';
import { useAuth } from '../../store/hooks/useAuth.ts';
import './PaintPage.styles.scss';
import {
  drawCircle,
  drawLine,
  drawRectangle,
  drawWithBrush,
} from './helpers/drawingHelpers.ts';
import { clearCanvas, onHomeButtonClick } from './helpers/toolbarHelpers.ts';

import Toolbar from '../../modules/Toolbar';
import { useForm } from 'react-hook-form';
import BrushSizeRange from '../../components/BrushSizeRange';

interface ExtendedCanvasRenderingContext2D extends CanvasRenderingContext2D {
  prevMouseX?: number;
  prevMouseY?: number;
  snapshot: ImageData;
}

function PaintPage() {
  const { imageId } = useParams();
  const { userId } = useAuth();

  const navigate = useNavigate();

  const canvasRef = useRef<null | HTMLCanvasElement>(null);
  const ctxRef = useRef<null | ExtendedCanvasRenderingContext2D>(null);
  const localStorageRef = useRef<null | Storage>(
    JSON.parse(localStorage.getItem('miniPaintToolData'))
  );

  const [isDrawing, setIsDrawing] = useState(false);

  const [searchParams, setSearchParams] = useSearchParams();

  const lineWidthParam =
    searchParams.get('lineWidth') || localStorageRef.current?.lineWidth || 5;
  const lineColorParam =
    searchParams.get('lineColor') ||
    localStorageRef.current?.lineColor ||
    '#000000';
  const toolParam =
    searchParams.get('tool') || localStorageRef.current?.tool || 'brush';

  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const startDrawing = (e) => {
    const canvasContext = ctxRef.current as ExtendedCanvasRenderingContext2D;
    canvasContext.prevMouseX = e.nativeEvent.offsetX;
    canvasContext.prevMouseY = e.nativeEvent.offsetY;
    canvasContext.beginPath();
    canvasContext.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    canvasContext.snapshot = canvasContext.getImageData(
      0,
      0,
      canvasRef.current!.width,
      canvasRef.current!.height
    );
    setIsDrawing(true);
  };

  const endDrawing = () => {
    ctxRef.current!.closePath();
    saveCanvasData();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current!.putImageData(ctxRef.current!.snapshot, 0, 0);
    switch (toolParam) {
      case 'brush':
        drawWithBrush(e, ctxRef.current);
        break;
      case 'rectangle':
        drawRectangle(e, ctxRef.current);
        break;
      case 'circle':
        drawCircle(e, ctxRef.current);
        break;
      case 'line':
        drawLine(e, ctxRef.current);
        break;
    }
  };

  const onToolbarButtonClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const pressedButtonId = event.target?.closest('button').id;
    console.log(pressedButtonId);
    switch (pressedButtonId) {
      case 'home':
        onHomeButtonClick(navigate);
        break;
      case 'save':
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
      navigate(`/paint/${newImageId}`);
    }
  };

  const saveCanvasData = () => {
    const dataURL = canvasRef.current!.toDataURL('image/png');
    setValue('canvas', dataURL);
  };

  const onRangeChange = (event) => {
    setSearchParams({
      lineColor: searchParams.get('lineColor'),
      tool: searchParams.get('tool'),
      lineWidth: event.target.value,
    });
  };

  const setCanvasBrushSize = (value) => {
    const context = ctxRef.current as ExtendedCanvasRenderingContext2D;
    context.lineWidth = value;
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
    // ctx.strokeStyle = lineColorParam;
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
    ctxRef.current!.strokeStyle = lineColorParam;
    if (toolParam !== 'rectangle') {
      ctxRef.current!.lineJoin = 'round';
    }
    if (toolParam === 'rectangle') {
      ctxRef.current!.lineJoin = 'miter';
    }
    return () => {
      console.log('unmount');
      localStorage.setItem(
        'miniPaintToolData',
        JSON.stringify({
          lineWidth: lineWidthParam,
          lineColor: lineColorParam,
          tool: toolParam,
        })
      );
    };
  }, [lineColorParam, toolParam, lineWidthParam]);

  return (
    <div className={'paint-page'}>
      <BrushSizeRange
        initialValue={lineWidthParam}
        onChange={onRangeChange}
        onCanvasChange={setCanvasBrushSize}
      />
      <Toolbar onToolbarButtonClick={onToolbarButtonClick} />

      <div className={'paint-page__content'}>
        <form className="drawing-form" onSubmit={handleSubmit(onSubmit)}>
          <canvas
            {...register('canvas')}
            className={'drawing-form__canvas'}
            id={'canvas'}
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseUp={endDrawing}
            onMouseMove={draw}
          />
          <input
            {...register('name', {
              required: true,
              minLength: 1,
              maxLength: 20,
              validate: {
                noSpaces: (value) => {
                  console.log(value.length);
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
