const drawWithBrush = (e, canvasContext) => {
  canvasContext.lineJoin = 'round';
  canvasContext.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  canvasContext.stroke();
};
const drawRectangle = (e, canvasContext) => {
  canvasContext.lineJoin = 'miter';
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;

  canvasContext.strokeRect(
    x,
    y,
    canvasContext.prevMouseX - e.nativeEvent.offsetX,
    canvasContext.prevMouseY - e.nativeEvent.offsetY
  );
};

const drawCircle = (e, canvasContext) => {
  canvasContext.lineJoin = 'round';
  canvasContext.beginPath();
  const radius = Math.sqrt(
    Math.pow(canvasContext.prevMouseX - e.nativeEvent.offsetX, 2) +
      Math.pow(canvasContext.prevMouseY - e.nativeEvent.offsetY, 2)
  );
  canvasContext.arc(
    canvasContext.prevMouseX,
    canvasContext.prevMouseY,
    radius,
    0,
    2 * Math.PI
  );
  canvasContext.stroke();
};

const drawLine = (e, canvasContext) => {
  canvasContext.lineJoin = 'round';
  canvasContext.beginPath();
  canvasContext.moveTo(canvasContext.prevMouseX, canvasContext.prevMouseY);
  canvasContext.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  canvasContext.stroke();
  canvasContext.closePath();
};

const TOOLS = {
  brush: drawWithBrush,
  rectangle: drawRectangle,
  circle: drawCircle,
  line: drawLine,
} as const;

export const chooseDrawingFunction = (tool) => {
  return TOOLS[tool];
};
