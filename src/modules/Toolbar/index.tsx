import { MouseEventHandler } from 'react';
import { toolbarButtons } from '../../pages/PaintPage/constants/toolbarButtonsData.tsx';
import Button from '../../UI/Button';
import shapes from '../../pages/PaintPage/constants/shapesData.tsx';
import { Link, useSearchParams } from 'react-router-dom';

interface ToolbarProps {
  onToolbarButtonClick: MouseEventHandler<HTMLDivElement>;
}
function Toolbar({ onToolbarButtonClick }: ToolbarProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const onShapeClick: MouseEventHandler<HTMLDivElement> = (event) => {
    const pressedButtonId = event.target.closest('button').id;
    setSearchParams({
      lineWidth: searchParams.get('lineWidth'),
      lineColor: searchParams.get('lineColor'),
      tool: pressedButtonId,
    });
  };

  return (
    <>
      <div className="paint-page__toolbar" onClick={onToolbarButtonClick}>
        {toolbarButtons.map(({ name, children }, index) => {
          if (index === 0) {
            return (
              <Link to="/home">
                <Button variant="filled" key={name} id={name}>
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
        <div className="paint-page__shapes-block" onClick={onShapeClick}>
          {shapes.map(({ shapeSVG, shapeId }) => {
            return (
              <Button variant="outlined" key={shapeId} id={shapeId}>
                {shapeSVG}
              </Button>
            );
          })}
        </div>

        <input
          type="color"
          value={searchParams.get('lineColor')}
          onChange={(event) =>
            setSearchParams({
              lineWidth: searchParams.get('lineWidth'),
              tool: searchParams.get('tool'),
              lineColor: event.target.value,
            })
          }
        />
      </div>
      <div></div>
    </>
  );
}

export default Toolbar;
