import { ref, set } from 'firebase/database';
import { database } from '../../../firebase.ts';
import { NavigateFunction } from 'react-router-dom';

export const clearCanvas = (
  context: CanvasRenderingContext2D,
  canvas: HTMLCanvasElement
) => {
  context.clearRect(0, 0, canvas.width, canvas.height);
};

export const openToolMenu = (menuId: string) => {
  if (document.getElementsByClassName('menu--opened').length) {
    const openedMenu = document.getElementsByClassName('menu--opened')[0];
    openedMenu.classList.remove('menu--opened');
  }
  const menu = document.getElementById(menuId);
  menu.classList.toggle('menu--opened');
};

export const saveImg = (
  imageId: string | undefined,
  userId: string,
  canvas: HTMLCanvasElement,
  navigate
) => {
  const imageUrl = canvas.toDataURL('image/png');
  if (imageId) {
    set(ref(database, userId + '/pictures/' + imageId), {
      imageUrl: canvas.toDataURL('image/png'),
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

export const onHomeButtonClick = (navigate: NavigateFunction) => {
  navigate('../home');
};
