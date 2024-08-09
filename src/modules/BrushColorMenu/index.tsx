import { useContext } from 'react';
import DrawingToolsContext from '../../context/DrawingToolsContext.ts';
import ToolbarMenu from '../../components/ToolbarMenu';

function BrushColorMenu() {
  const { lineColor, changeLineColor } = useContext(DrawingToolsContext);

  return (
    <ToolbarMenu title={'Brush Color'} id={'brush-color-menu'}>
      <input
        type="color"
        value={lineColor}
        onChange={(event) => changeLineColor(event.target.value)}
      />
    </ToolbarMenu>
  );
}

export default BrushColorMenu;
