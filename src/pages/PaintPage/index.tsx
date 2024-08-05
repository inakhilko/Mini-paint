import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Button from '../../UI/Button';
import './PaintPage.styles.scss';

function PaintPage() {
  const canvasRef = useRef(null);

  const [lineWidth, setLineWidth] = useState(5);
  const [lineColor, setLineColor] = useState('#000000');

  const ctxRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas: HTMLCanvasElement | null = canvasRef.current;
    const ctx = canvas.getContext?.('2d');

    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.fillStyle = lineColor;
    ctx.lineWidth = lineWidth;
    ctxRef.current = ctx;
  }, [canvasRef, lineWidth, lineColor]);

  const startDrawing = (e) => {
    console.log(e);
    ctxRef.current.beginPath();
    ctxRef.current.moveTo(e.clientX, e.clientY);
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
    ctxRef.current.lineTo(e.clientX, e.clientY);

    ctxRef.current.stroke();
  };

  return (
    <div className={'paint-page'}>
      <div className={'paint-page__menu'}>
        <Link to={'/home'}>
          <Button variant={'filled'}>
            <svg id="Layer_1" width="24" height="24" color="inherit">
              <path
                id="color_x5F_1_1_"
                fill="currentColor"
                d="M24.767,13.639c0.498,0.498,0.145,1.35-0.559,1.35H20.67v7.143 c0,0.567-0.46,1.027-1.027,1.027h-4.42v-5.447c0-1.504-1.219-2.723-2.723-2.723s-2.723,1.219-2.723,2.723v5.447h-4.42 c-0.567,0-1.027-0.46-1.027-1.027v-7.143H0.792c-0.704,0-1.057-0.852-0.559-1.35L11.699,2.173c0.442-0.442,1.16-0.442,1.602,0 L24.767,13.639z"
              ></path>
            </svg>
          </Button>
        </Link>
        <Button variant={'outlined'}>Save</Button>
        <Button variant={'outlined'}>Load</Button>
        <Button variant={'outlined'}>Clear</Button>
        <Button variant={'outlined'}>
          <svg
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
        <div className={'menu'}>
          <h3>Brush Size</h3>
          <input
            type="range"
            min="1"
            max="200"
            className="slider"
            id="myRange"
            value={lineWidth}
            onChange={(event) => setLineWidth(Number(event.target.value))}
          />
        </div>
        <div className={'menu'}>
          <h3>Brush Color</h3>
          <input
            type="color"
            value={lineColor}
            onChange={(event) => setLineColor(event.target.value)}
          />
        </div>
      </div>
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
