import { MouseEventHandler, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { database } from '../../firebase.ts';
import DrawingToolsContext from '../../context/DrawingToolsContext.ts';
import { useAuth } from '../../store/hooks/useAuth.ts';
import './PaintPage.styles.scss';
import {
  drawCircle,
  drawLine,
  drawRectangle,
  drawWithBrush,
} from './helpers/drawingHelpers.ts';
import {
  clearCanvas,
  onHomeButtonClick,
  openToolMenu,
  saveImg,
} from './helpers/toolbarHelpers.ts';

import Toolbar from '../../modules/Toolbar';

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

  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState('#000000');
  const [tool, setTool] = useState('brush');

  const [isDrawing, setIsDrawing] = useState(false);

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
    setIsDrawing(false);
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current!.putImageData(ctxRef.current!.snapshot, 0, 0);
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

  const onToolbarButtonClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const pressedButtonId = event.target.closest('button').id;
    switch (pressedButtonId) {
      case 'home':
        onHomeButtonClick(navigate);
        break;
      case 'save':
        saveImg(
          imageId,
          userId,
          canvasRef.current as HTMLCanvasElement,
          navigate
        );
        break;
      case 'clear':
        clearCanvas(ctxRef.current!, canvasRef.current!);
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
    const canvas = canvasRef.current as HTMLCanvasElement;
    canvas.width = 500;
    canvas.height = 500;

    const ctx = canvas.getContext?.('2d') as ExtendedCanvasRenderingContext2D;

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
    ctxRef.current!.strokeStyle = lineColor;
    ctxRef.current!.lineWidth = lineWidth;
    if (tool !== 'rectangle') {
      ctxRef.current!.lineJoin = 'round';
    }
    if (tool === 'rectangle') {
      ctxRef.current!.lineJoin = 'miter';
    }
  }, [lineColor, lineWidth, tool]);

  return (
    <div className={'paint-page'}>
      <DrawingToolsContext.Provider
        value={{
          lineWidth,
          lineColor,
          changeTool: setTool,
          changeLineWidth: setLineWidth,
          changeLineColor: setLineColor,
        }}
      >
        <Toolbar onToolbarButtonClick={onToolbarButtonClick} />
      </DrawingToolsContext.Provider>

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
