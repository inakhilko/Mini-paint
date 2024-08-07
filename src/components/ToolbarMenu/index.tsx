import { ComponentProps, useRef } from 'react';

interface ToolbarMenuProps extends ComponentProps<'div'> {
  // onMenuExitClick: EventHandler<'click'>;
  title: string;
}
function ToolbarMenu(props: ToolbarMenuProps) {
  const { title, children, id } = props;

  const exitRef = useRef(null);
  const onMenuExitClick = (e) => {
    if (!e.target.contains(exitRef.current)) {
      e.target.closest('.menu').classList.remove('menu--opened');
    }

    console.log('clicked');
  };
  return (
    <div className={'menu'} id={id}>
      <div className="menu__heading-block" onClick={onMenuExitClick}>
        <h3>{title}</h3>
        <button className="menu__exit-btn" ref={exitRef}>
          <svg focusable="false" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path>
          </svg>
        </button>
      </div>
      <div className="menu__content">{children}</div>
    </div>
  );
}

export default ToolbarMenu;
