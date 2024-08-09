import Form from '../../components/Form';
import { useDispatch } from 'react-redux';
import { setUser } from '../../store/slices/UserSlice.ts';
import * as fbAuth from 'firebase/auth';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

const { getAuth, createUserWithEmailAndPassword } = fbAuth;

function SignUpForm() {
  const dispatch = useDispatch();
  const handleRegister = (email, password) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        dispatch(
          setUser({ email: user.email, token: user.accessToken, id: user.uid })
        );
      })
      .catch((error) => {
        switch (error.code) {
          case 'auth/email-already-in-use':
            toast.error('Email already in use');
            break;
          case 'auth/weak-password':
            toast.error('Password is too weak');
            break;
          case 'auth/invalid-email':
            toast.error('Invalid email');
            break;
          default:
            toast.error('Registration error');
            break;
        }
      });
  };

  return (
    <>
      <div className={'public-form'}>
        <h2 className={'public-form__title'}>Sign Up</h2>
        <Form title={'Sign Up'} handleClick={handleRegister} />
        <span className={'public-form__additional-info'}>
          If you already have an account <Link to={'/login'}>sign in</Link>
        </span>
      </div>
      <ToastContainer />
    </>
  );
}

export default SignUpForm;
