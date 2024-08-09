import { useContext } from 'react';
import DrawingToolsContext from '../../context/DrawingToolsContext.ts';
import ToolbarMenu from '../../components/ToolbarMenu';

function BrushSizeMenu() {
  const { lineWidth, changeLineWidth } = useContext(DrawingToolsContext);
  return (
    <ToolbarMenu title={'Brush Size'} id="brush-size-menu">
      <input
        type="range"
        min="1"
        max="200"
        className="slider"
        value={lineWidth}
        onChange={(event) => changeLineWidth(Number(event.target.value))}
      />
    </ToolbarMenu>
  );
}

export default BrushSizeMenu;
