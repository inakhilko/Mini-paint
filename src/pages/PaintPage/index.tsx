import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import ToolbarMenu from '../../components/ToolbarMenu';
import shapes from './constants/shapesData.tsx';
import Button from '../../UI/Button';
import './PaintPage.styles.scss';

// type tool = 'brush' | 'rectangle' | 'circle' | 'eraser';

function PaintPage() {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);

  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState('#000000');
  const [isDrawing, setIsDrawing] = useState(false);

  const [tool, setTool] = useState('brush');

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    canvas.width = 762;
    canvas.height = 450;

    const ctx = canvas.getContext?.('2d');
    ctx.lineCap = 'round';
    ctx.strokeStyle = lineColor;
    ctx.lineWidth = lineWidth;

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = lineColor;
    ctxRef.current.lineWidth = lineWidth;
  }, [lineColor, lineWidth]);

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

  const drawRectangle = (e) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;

    ctxRef.current.strokeRect(
      x,
      y,
      ctxRef.current.prevMouseX - e.nativeEvent.offsetX,
      ctxRef.current.prevMouseY - e.nativeEvent.offsetY
    );
  };

  const drawCircle = (e) => {
    ctxRef.current.beginPath();
    const radius = Math.sqrt(
      Math.pow(ctxRef.current.prevMouseX - e.nativeEvent.offsetX, 2) +
        Math.pow(ctxRef.current.prevMouseY - e.nativeEvent.offsetY, 2)
    );
    ctxRef.current.arc(
      ctxRef.current.prevMouseX,
      ctxRef.current.prevMouseY,
      radius,
      0,
      2 * Math.PI
    );
    ctxRef.current.stroke();
  };

  const drawLine = (e) => {
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(ctxRef.current.prevMouseX, ctxRef.current.prevMouseY);
    ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctxRef.current.stroke();
    ctxRef.current.closePath();
    // ctxRef.current.prevMouseX = e.nativeEvent.offsetX;
    // ctxRef.current.prevMouseY = e.nativeEvent.offsetY;
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    ctxRef.current.putImageData(ctxRef.current.snapshot, 0, 0);
    // ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    // ctxRef.current.stroke();
    if (tool === 'brush') {
      ctxRef.current.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctxRef.current.stroke();
    }
    if (tool === 'line') {
      drawLine(e);
    }
    if (tool === 'rectangle') {
      drawRectangle(e);
    }
    if (tool === 'circle') {
      drawCircle(e);
    }
  };

  const clearCanvas = () => {
    ctxRef.current.clearRect(0, 0, 762, 450);
  };

  const openToolMenu = (menuId) => {
    const menu = document.getElementById(menuId);
    menu.classList.toggle('menu--opened');
  };

  const onShapeClick = (e) => {
    setTool(e.currentTarget.id);
  };

  // const saveImg = () => {};

  return (
    <div className={'paint-page'}>
      <div className={'paint-page__toolbar'}>
        <Button variant={'outlined'}>
          <Link to={'/home'}>
            <svg id="home" width="24" height="24" color="inherit">
              <path
                id="color_x5F_1_1_"
                fill="currentColor"
                d="M24.767,13.639c0.498,0.498,0.145,1.35-0.559,1.35H20.67v7.143 c0,0.567-0.46,1.027-1.027,1.027h-4.42v-5.447c0-1.504-1.219-2.723-2.723-2.723s-2.723,1.219-2.723,2.723v5.447h-4.42 c-0.567,0-1.027-0.46-1.027-1.027v-7.143H0.792c-0.704,0-1.057-0.852-0.559-1.35L11.699,2.173c0.442-0.442,1.16-0.442,1.602,0 L24.767,13.639z"
              ></path>
            </svg>
          </Link>
        </Button>

        <Button variant={'outlined'}>
          <svg
            id="save"
            width="800px"
            height="800px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M18.1716 1C18.702 1 19.2107 1.21071 19.5858 1.58579L22.4142 4.41421C22.7893 4.78929 23 5.29799 23 5.82843V20C23 21.6569 21.6569 23 20 23H4C2.34315 23 1 21.6569 1 20V4C1 2.34315 2.34315 1 4 1H18.1716ZM4 3C3.44772 3 3 3.44772 3 4V20C3 20.5523 3.44772 21 4 21L5 21L5 15C5 13.3431 6.34315 12 8 12L16 12C17.6569 12 19 13.3431 19 15V21H20C20.5523 21 21 20.5523 21 20V6.82843C21 6.29799 20.7893 5.78929 20.4142 5.41421L18.5858 3.58579C18.2107 3.21071 17.702 3 17.1716 3H17V5C17 6.65685 15.6569 8 14 8H10C8.34315 8 7 6.65685 7 5V3H4ZM17 21V15C17 14.4477 16.5523 14 16 14L8 14C7.44772 14 7 14.4477 7 15L7 21L17 21ZM9 3H15V5C15 5.55228 14.5523 6 14 6H10C9.44772 6 9 5.55228 9 5V3Z"
              fill="#0F0F0F"
            />
          </svg>
        </Button>
        <Button variant={'outlined'} onClick={clearCanvas}>
          <svg
            id="rubber"
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="-1.5 -2.5 24 24"
            xmlns="http://www.w3.org/2000/svg"
            preserveAspectRatio="xMinYMin"
            className="jam jam-rubber"
          >
            <path d="M12.728 12.728L8.485 8.485l-5.657 5.657 2.122 2.121a3 3 0 0 0 4.242 0l3.536-3.535zM11.284 17H14a1 1 0 0 1 0 2H3a1 1 0 0 1-.133-1.991l-1.453-1.453a2 2 0 0 1 0-2.828L12.728 1.414a2 2 0 0 1 2.828 0L19.8 5.657a2 2 0 0 1 0 2.828L11.284 17z" />
          </svg>
        </Button>
        <Button variant={'outlined'}>
          <svg
            id="undo"
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 10h6c1.654 0 3 1.346 3 3s-1.346 3-3 3h-3v2h3c2.757 0 5-2.243 5-5s-2.243-5-5-5H9V5L4 9l5 4v-3z"></path>
          </svg>
        </Button>
        <Button variant={'outlined'}>
          <svg
            id="redo"
            stroke="currentColor"
            fill="currentColor"
            viewBox="0 0 24 24"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M9 18h3v-2H9c-1.654 0-3-1.346-3-3s1.346-3 3-3h6v3l5-4-5-4v3H9c-2.757 0-5 2.243-5 5s2.243 5 5 5z"></path>
          </svg>
        </Button>
        <Button variant={'outlined'} onClick={() => openToolMenu('shape-menu')}>
          <svg
            id="shape"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
          >
            <path
              fill="currentColor"
              d="M5.2,19.8H2.1c-1.2,0-2.1-1-2.1-2.1V2.1C0,1,1,0,2.1,0h15.6c1.2,0,2.1,1,2.1,2.1v3.2 C19.3,5,18.7,4.8,18,4.6V2.1c0-0.2-0.1-0.3-0.3-0.3H2.1c-0.2,0-0.3,0.1-0.3,0.3v15.6c0,0.2,0.1,0.3,0.3,0.3h2.4 C4.7,18.7,4.9,19.3,5.2,19.8z M25,15.2c0-5.5-4.5-10.1-10.1-10.1c-5.4,0-9.8,4.4-9.8,9.8v0.3c0,5.4,4.4,9.8,9.8,9.8h0.3 C20.6,25,25,20.6,25,15.2z M23.2,15.2c0,4.4-3.6,8-8,8h-0.3c-4.4,0-8-3.6-8-8v-0.3c0-4.4,3.6-8,8-8C19.5,7,23.2,10.7,23.2,15.2z"
            ></path>
          </svg>
        </Button>
        <Button
          variant={'outlined'}
          onClick={() => openToolMenu('brush-color')}
        >
          <svg
            id={'color'}
            fill="#000000"
            width="800px"
            height="800px"
            viewBox="0 0 16 16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M8 .5C3.58.5 0 3.86 0 8s3.58 7.5 8 7.5c4.69 0 1.04-2.83 2.79-4.55.76-.75 1.63-.87 2.44-.87.37 0 .73.03 1.06.03.99 0 1.72-.23 1.72-2.1C16 3.86 12.42.5 8 .5zm6.65 8.32c-.05.01-.16.02-.37.02-.14 0-.29 0-.45-.01-.19 0-.39-.01-.61-.01-.89 0-2.19.13-3.32 1.23-1.17 1.16-.9 2.6-.74 3.47.03.18.08.44.09.6-.16.05-.52.13-1.26.13-3.72 0-6.75-2.8-6.75-6.25S4.28 1.75 8 1.75s6.75 2.8 6.75 6.25c0 .5-.06.74-.1.82z" />
            <path d="M5.9 9.47c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79-.84-1.79-1.86-1.79zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm-.2-4.59c0-.99-.84-1.79-1.86-1.79s-1.86.8-1.86 1.79.84 1.79 1.86 1.79 1.86-.8 1.86-1.79zm-1.86.56c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zM7.37 2.5c-1.03 0-1.86.8-1.86 1.79s.84 1.79 1.86 1.79 1.86-.8 1.86-1.79S8.39 2.5 7.37 2.5zm0 2.35c-.35 0-.64-.25-.64-.56s.29-.56.64-.56.64.25.64.56-.29.56-.64.56zm2.47 1.31c0 .99.84 1.79 1.86 1.79s1.86-.8 1.86-1.79-.84-1.79-1.86-1.79-1.86.8-1.86 1.79zm2.5 0c0 .31-.29.56-.64.56s-.64-.25-.64-.56.29-.56.64-.56.64.25.64.56z" />
          </svg>
        </Button>
        <Button variant={'outlined'} onClick={() => openToolMenu('brush-size')}>
          <svg
            id={'width'}
            width="800px"
            height="800px"
            viewBox="0 0 15 15"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M11.5 3.04999C11.7485 3.04999 11.95 3.25146 11.95 3.49999V7.49999C11.95 7.74852 11.7485 7.94999 11.5 7.94999C11.2515 7.94999 11.05 7.74852 11.05 7.49999V4.58639L4.58638 11.05H7.49999C7.74852 11.05 7.94999 11.2515 7.94999 11.5C7.94999 11.7485 7.74852 11.95 7.49999 11.95L3.49999 11.95C3.38064 11.95 3.26618 11.9026 3.18179 11.8182C3.0974 11.7338 3.04999 11.6193 3.04999 11.5L3.04999 7.49999C3.04999 7.25146 3.25146 7.04999 3.49999 7.04999C3.74852 7.04999 3.94999 7.25146 3.94999 7.49999L3.94999 10.4136L10.4136 3.94999L7.49999 3.94999C7.25146 3.94999 7.04999 3.74852 7.04999 3.49999C7.04999 3.25146 7.25146 3.04999 7.49999 3.04999L11.5 3.04999Z"
              fill="#000000"
            />
          </svg>
        </Button>
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
      <ToolbarMenu title={'Brush Size'} id="brush-size">
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
      <ToolbarMenu title={'Brush Color'} id={'brush-color'}>
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
