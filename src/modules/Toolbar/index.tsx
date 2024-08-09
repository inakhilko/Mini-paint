import { MouseEventHandler } from 'react';
import { toolbarButtons } from '../../pages/PaintPage/constants/toolbarButtonsData.tsx';
import Button from '../../UI/Button';
import ShapesToolbarMenu from '../ShapesToolbarMenu';
import BrushSizeMenu from '../BrushSizeMenu';
import BrushColorMenu from '../BrushColorMenu';

interface ToolbarProps {
  onToolbarButtonClick: MouseEventHandler<HTMLDivElement>;
}
function Toolbar({ onToolbarButtonClick }: ToolbarProps) {
  return (
    <>
      <div className={'paint-page__toolbar'} onClick={onToolbarButtonClick}>
        {toolbarButtons.map(({ name, children }) => {
          return (
            <Button variant={'outlined'} key={name} id={name}>
              {children}
            </Button>
          );
        })}
      </div>
      <div></div>
      <ShapesToolbarMenu />
      <BrushSizeMenu />
      <BrushColorMenu />
    </>
  );
}

export default Toolbar;
