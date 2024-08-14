export const clearCanvas = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = '#ffffff';
  context.fillRect(0, 0, canvas.width, canvas.height);
};

export const openToolMenu = (menuId: string) => {
  if (document.getElementsByClassName('menu--opened').length) {
    const openedMenu = document.getElementsByClassName('menu--opened')[0];
    openedMenu.classList.remove('menu--opened');
  }
  const menu = document.getElementById(menuId);
  menu.classList.toggle('menu--opened');
};
