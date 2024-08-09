export const drawWithBrush = (e, canvasContext) => {
  canvasContext.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  canvasContext.stroke();
};
export const drawRectangle = (e, canvasContext) => {
  const x = e.nativeEvent.offsetX;
  const y = e.nativeEvent.offsetY;

  canvasContext.strokeRect(
    x,
    y,
    canvasContext.prevMouseX - e.nativeEvent.offsetX,
    canvasContext.prevMouseY - e.nativeEvent.offsetY
  );
};

export const drawCircle = (e, canvasContext) => {
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

export const drawLine = (e, canvasContext) => {
  canvasContext.beginPath();
  canvasContext.moveTo(canvasContext.prevMouseX, canvasContext.prevMouseY);
  canvasContext.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
  canvasContext.stroke();
  canvasContext.closePath();
};
