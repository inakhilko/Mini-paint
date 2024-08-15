export const clearCanvas = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
};
