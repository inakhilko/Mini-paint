import Button from '../../UI/Button';
import './Header.styles.scss';
import { useDispatch } from 'react-redux';
import { removeUser } from '../../store/slices/UserSlice.ts';
import * as fbAuth from 'firebase/auth';

function Header() {
  const dispatch = useDispatch();
  const { getAuth } = fbAuth;
  const auth = getAuth();
  const onLogoutClick = () => {
    dispatch(removeUser());
    localStorage.removeItem('miniPaintToolData');
    auth.signOut();
  };

  return (
    <header className="header">
      <div className="header__container">
        <h1>Mini Paint</h1>
        <div className="header__controls">
          <Button variant="filled" square={true} onClick={onLogoutClick}>
            <svg width="25px" height="25px">
              <path
                d="M12.1,0L3.3,2.9C2.5,3.2,1.8,4.3,1.8,5.3v14.9c0,1,0.6,1.8,1.5,2.1l8.5,2.7h0.3 c1,0,1.8-0.9,1.8-2.1V2.1C13.9,0.9,13.1,0,12.1,0z M11.2,13.6c-0.6,0-1.1-0.5-1.1-1.1s0.5-1.1,1.1-1.1s1.1,0.5,1.1,1.1 C12.3,13.1,11.8,13.6,11.2,13.6z M23.2,12.7L19,16.9v-2.7h-3.4v-3.4H19V8.1l4.2,4.2C23.3,12.4,23.3,12.6,23.2,12.7z M21.1,5.7h-5.6 V3.9h5.6c1.2,0,2.1,1,2.1,2.1v4.4l-1.8-1.8V6C21.4,5.8,21.2,5.7,21.1,5.7z M23.2,14.6V19c0,1.2-1,2.1-2.1,2.1h-5.6v-1.8h5.6 c0.2,0,0.3-0.1,0.3-0.3v-2.6L23.2,14.6z"
                fill="currentColor"
              ></path>
            </svg>
          </Button>
        </div>
      </div>
    </header>
  );
}

export default Header;
