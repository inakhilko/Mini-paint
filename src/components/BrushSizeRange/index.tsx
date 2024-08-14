import './BrushSizeRange.styles.scss';
import { useState } from 'react';

interface BrushSizeRangeProps {
  initialValue: number;
  onChange: (param: string, value: string) => void;
  onCanvasChange: (value: string) => void;
}

function BrushSizeRange({
  initialValue,
  onChange,
  onCanvasChange,
}: BrushSizeRangeProps) {
  const [inputValue, setInputValue] = useState(initialValue);

  function debounce(func, delay) {
    let timer;
    return function (...args) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func.apply(this, args);
      }, delay);
    };
  }

  const debouncedOnChange = debounce(onChange, 1500);

  return (
    <div className="brush-size-range">
      <span className="brush-size-range__value">200px</span>
      <div className="brush-size-range__wrapper">
        <input
          type="range"
          min={1}
          max={200}
          value={inputValue}
          className="brush-size-range__input"
          onChange={(event) => {
            setInputValue(Number(event.target.value));
            onCanvasChange(event.target.value);
            debouncedOnChange('lineWidth', event.target.value);
          }}
        />
        <div className="progress"></div>
      </div>

      <span className="brush-size-range__value">{inputValue}px</span>
    </div>
  );
}

export default BrushSizeRange;
