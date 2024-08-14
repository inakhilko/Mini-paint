import './Button.styles.scss';
import { ComponentProps } from 'react';
import classNames from 'classnames';

interface ButtonProps extends ComponentProps<'button'> {
  variant?: 'filled' | 'outlined';
  square?: boolean;
  className?: string;
}

function Button(props: ButtonProps) {
  const { variant, square, children, className, ...otherProps } = props;

  const buttonClasses = classNames([
    'button',
    `button--${variant}`,
    square && 'button--square',
    className,
  ]);

  return (
    <button className={buttonClasses} type={'button'} {...otherProps}>
      {children}
    </button>
  );
}

export default Button;
