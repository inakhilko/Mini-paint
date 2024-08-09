import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import ToolbarMenu from '../../components/ToolbarMenu';
import shapes from './constants/shapesData.tsx';
import Button from '../../UI/Button';
import './PaintPage.styles.scss';
import { onValue, ref, set } from 'firebase/database';
import { database } from '../../firebase.ts';
import { toolbarButtons } from './constants/toolbarButtonsData.tsx';
import {
  drawCircle,
  drawLine,
  drawRectangle,
  drawWithBrush,
} from './helpers/drawingHelpers.tsx';
import { useAuth } from '../../store/hooks/useAuth.ts';

function PaintPage() {
  const { imageId } = useParams();
  const { userId } = useAuth();

  const navigate = useNavigate();

  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);

  const [tool, setTool] = useState('brush');

  const startDrawing = (e) => {
    ctxRef.current.prevMouseX = e.nativeEvent.offsetX;
    ctxRef.current.prevMouseY = e.nativeEvent.offsetY;
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.snapshot = ctxRef.current.getImageData(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
    setIsDrawing(true);
  };

  const endDrawing = () => {
    ctxRef.current.closePath();
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.putImageData(ctxRef.current.snapshot, 0, 0);
    switch (tool) {
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

  const clearCanvas = () => {
    ctxRef.current.clearRect(
      0,
      0,
      canvasRef.current.width,
      canvasRef.current.height
    );
  };

  const openToolMenu = (menuId) => {
    const menu = document.getElementById(menuId);
    menu.classList.toggle('menu--opened');
  };

  const onShapeClick = (e) => {
    setTool(e.currentTarget.id);
  };

  const saveImg = (imageId) => {
    const imageUrl = canvasRef.current.toDataURL('image/png');
    if (imageId) {
      set(ref(database, userId + '/pictures/' + imageId), {
        imageUrl: canvasRef.current.toDataURL('image/png'),
        imageId,
      });
    } else {
      const newImageId = Date.now();
      set(ref(database, userId + '/pictures' + `/${newImageId}`), {
        imageUrl,
        imageId: newImageId,
      });
      navigate(`/paint/${newImageId}`);
    }
  };

  const onHomeButtonClick = () => {
    navigate('../home');
  };

  const onToolbarButtonClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const pressedButtonId = event.target.closest('button').id;
    switch (pressedButtonId) {
      case 'home':
        onHomeButtonClick();
        break;
      case 'save':
        saveImg(imageId);
        break;
      case 'clear':
        clearCanvas();
        break;
      case 'shape':
        openToolMenu('shape-menu');
        break;
      case 'brush-color':
        openToolMenu('brush-color-menu');
        break;
      case 'brush-size':
        openToolMenu('brush-size-menu');
        break;
    }
  };

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    canvas.width = 500;
    canvas.height = 500;

    const ctx = canvas.getContext?.('2d');

    if (imageId) {
      onValue(ref(database, userId + '/pictures/' + imageId), (snapshot) => {
        const data = snapshot.val();
        const img = new Image();
        img.src = data.imageUrl;
        ctx.drawImage(img, 0, 0);
      });
    } else {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
    ctx.lineCap = 'round';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    ctxRef.current = ctx;
  }, [imageId, canvasRef]);

  useEffect(() => {
    ctxRef.current.strokeStyle = lineColor;
    ctxRef.current.lineWidth = lineWidth;
  }, [lineColor, lineWidth]);

  return (
    <div className={'paint-page'}>
      <div className={'paint-page__toolbar'} onClick={onToolbarButtonClick}>
        {toolbarButtons.map(({ name, children }) => {
          return (
            <Button variant={'outlined'} key={name} id={name}>
              {children}
            </Button>
          );
        })}
      </div>
      <ToolbarMenu title={'Shape'} id={'shape-menu'}>
        <div className={'shapes-container'}>
          {shapes.map(({ shapeSVG, shapeId }) => {
            return (
              <button
                className={'shape'}
                key={shapeId}
                id={shapeId}
                onClick={onShapeClick}
              >
                {shapeSVG}
              </button>
            );
          })}
        </div>
      </ToolbarMenu>
      <ToolbarMenu title={'Brush Size'} id="brush-size-menu">
        <input
          type="range"
          min="1"
          max="200"
          className="slider"
          id="myRange"
          value={lineWidth}
          onChange={(event) => setLineWidth(Number(event.target.value))}
        />
      </ToolbarMenu>
      <ToolbarMenu title={'Brush Color'} id={'brush-color-menu'}>
        <input
          type="color"
          value={lineColor}
          onChange={(event) => setLineColor(event.target.value)}
        />
      </ToolbarMenu>

      <div className={'paint-page__content'}>
        <canvas
          className={'paint-page__canvas'}
          id={'canvas'}
          ref={canvasRef}
          onMouseDown={startDrawing}
          onMouseUp={endDrawing}
          onMouseMove={draw}
        />
      </div>
    </div>
  );
}

export default PaintPage;
