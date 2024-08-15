import { ComponentProps, RefObject, useState } from 'react';
import { FieldValues, UseFormRegister } from 'react-hook-form';
import { chooseDrawingFunction } from '../../pages/PaintPage/helpers/drawingHelpers.ts';

interface DrawingCanvasProps extends ComponentProps<'canvas'> {
  canvasRef: RefObject<HTMLCanvasElement>;
  contextRef: RefObject<ExtendedCanvasRenderingContext2D>;
  initialTool: string;
  register: UseFormRegister<FieldValues>;
}

export interface ExtendedCanvasRenderingContext2D
  extends CanvasRenderingContext2D {
  prevMouseX?: number;
  prevMouseY?: number;
  snapshot: ImageData;
}

function DrawingCanvas(props: DrawingCanvasProps) {
  const { canvasRef, contextRef, initialTool, register, ...otherProps } = props;

  const [isDrawing, setIsDrawing] = useState(false);
  const startDrawing = (e) => {
    const canvasContext = contextRef.current;
    if (canvasContext) {
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
    }
  };

  const endDrawing = () => {
    const canvasContext = contextRef.current;
    if (canvasContext) {
      canvasContext.closePath();
      setIsDrawing(false);
    }
  };

  const draw = (e) => {
    if (!isDrawing) {
      return;
    }
    contextRef.current!.putImageData(contextRef.current!.snapshot, 0, 0);
    const draw = chooseDrawingFunction(initialTool);
    draw(e, contextRef.current!);
  };

  return (
    <canvas
      {...register('canvas')}
      className={'drawing-form__canvas'}
      id={'canvas'}
      ref={canvasRef}
      onMouseDown={startDrawing}
      onMouseUp={endDrawing}
      onMouseMove={draw}
      {...otherProps}
    />
  );
}

export default DrawingCanvas;
