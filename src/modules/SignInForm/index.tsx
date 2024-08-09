import { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import * as fbAuth from 'firebase/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { auth } from '../../firebase.ts';
import { setUser } from '../../store/slices/UserSlice.ts';
import Form from '../../components/Form';

const { signInWithEmailAndPassword } = fbAuth;

function SignInForm() {
  const dispatch = useDispatch();

  const handleLogIn = useCallback(
    (email, password) => {
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          dispatch(
            setUser({
              email: user.email,
              token: user.accessToken,
              id: user.uid,
            })
          );
        })
        .catch((error) => {
          switch (error.code) {
            case 'auth/invalid-credential':
              toast.error('Invalid email or password');
              break;
            default:
              toast.error('Authentication error');
              break;
          }
        });
    },
    [dispatch]
  );

  return (
    <>
      <div className="public-form">
        <h2 className="public-form__title">Sign In</h2>
        <Form title={'Log In'} handleClick={handleLogIn} />
        <span className={'public-form__additional-info'}>
          If you do not have an account <Link to={'/register'}>sign up</Link>
        </span>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignInForm;
