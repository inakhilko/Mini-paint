import './Button.styles.scss';
import { ComponentProps } from 'react';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'filled' | 'outlined';
  square?: boolean;
}

function Button(props: ButtonProps) {
  const { variant, square, children, ...otherProps } = props;

  const buttonClasses = [
    'button',
    `button--${variant}`,
    square && 'button--square',
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <button className={buttonClasses} type={'button'} {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
