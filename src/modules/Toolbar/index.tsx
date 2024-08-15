import { ChangeEventHandler, MouseEventHandler, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { toolbarButtons } from '../../pages/PaintPage/constants/toolbarButtonsData.tsx';
import shapes from '../../pages/PaintPage/constants/shapesData.tsx';
import Button from '../../UI/Button';
import DeleteButton from '../../components/DeleteButton';

interface ToolbarProps {
  onToolbarButtonClick: MouseEventHandler<HTMLDivElement>;
  initialColorValue: string;
  setCanvasColor: (color: string) => void;
  toolParam: string;
  setParams: (param: string, value: string) => void;
}

function Toolbar({
  onToolbarButtonClick,
  initialColorValue,
  setCanvasColor,
  toolParam,
  setParams,
}: ToolbarProps) {
  const [tool, setTool] = useState(toolParam);
  const [color, setColor] = useState(initialColorValue);

  const onShapeClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const pressedButtonId = event.target.closest('button').id;
    setTool(pressedButtonId);
    setParams('tool', pressedButtonId);
  };

  const onColorInputChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setColor(event.target.value);
    setCanvasColor(event.target.value);
    setParams('lineColor', event.target.value);
  };

  return (
    <>
      <div className="paint-page__toolbar">
        <div className="paint-page__toolbar-top-block">
          <div
            className="paint-page__toolbar-main"
            onClick={onToolbarButtonClick}
          >
            {toolbarButtons.map(({ name, children }, index) => {
              if (index === 0) {
                return (
                  <Link to="/home" key={name}>
                    <Button variant="filled" id={name}>
                      {children}
                    </Button>
                  </Link>
                );
              }
              return (
                <Button variant="outlined" key={name} id={name}>
                  {children}
                </Button>
              );
            })}
          </div>
          <div className="paint-page__toolbar-shapes" onClick={onShapeClick}>
            {shapes.map(({ shapeSVG, shapeId }) => {
              return (
                <Button
                  variant="outlined"
                  key={shapeId}
                  id={shapeId}
                  className={classNames(tool === shapeId ? 'current-tool' : '')}
                >
                  {shapeSVG}
                </Button>
              );
            })}
          </div>
          <input
            type="color"
            value={color}
            onChange={(event) => onColorInputChange(event)}
          />
        </div>
        <DeleteButton />
      </div>
    </>
  );
}

export default Toolbar;
