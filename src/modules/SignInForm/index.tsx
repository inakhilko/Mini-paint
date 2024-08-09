import Form from '../../components/Form';
import { useDispatch } from 'react-redux';
import * as fbAuth from 'firebase/auth';
import { setUser } from '../../store/slices/UserSlice.ts';
import { Link } from 'react-router-dom';
import { useCallback } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const { getAuth, signInWithEmailAndPassword } = fbAuth;

function SignInForm() {
  const dispatch = useDispatch();

  const handleLogIn = useCallback(
    (email, password) => {
      const auth = getAuth();
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
