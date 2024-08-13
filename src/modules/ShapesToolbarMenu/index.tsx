import shapes from '../../pages/PaintPage/constants/shapesData.tsx';
import ToolbarMenu from '../../components/ToolbarMenu';

function ShapesToolbarMenu() {
  // const { changeTool } = useContext(DrawingToolsContext);
  // const onShapeClick: MouseEventHandler<HTMLDivElement> = (event) => {
  //   const pressedButtonId = event.target.closest('button').id;
  //   changeTool(pressedButtonId);
  // };

  return (
    <ToolbarMenu title={'Shape'} id={'shape-menu'}>
      <div className={'shapes-container'} onClick={}>
        {shapes.map(({ shapeSVG, shapeId }) => {
          return (
            <button className={'shape'} key={shapeId} id={shapeId}>
              {shapeSVG}
            </button>
          );
        })}
      </div>
    </ToolbarMenu>
  );
}

export default ShapesToolbarMenu;
