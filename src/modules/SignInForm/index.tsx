import Form from '../../components/Form';
import { useDispatch } from 'react-redux';
import * as fbAuth from 'firebase/auth';
import { setUser } from '../../store/slices/UserSlice.ts';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../../store/hooks/useAuth.ts';
import { useCallback, useEffect } from 'react';
function SignInForm() {
  const dispatch = useDispatch();
  const handleLogIn = useCallback(
    (email, password) => {
      const { getAuth, signInWithEmailAndPassword } = fbAuth;
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
          // localStorage.setItem(
          //   'paintUser',
          //   JSON.stringify({
          //     email: user.email,
          //     token: user.accessToken,
          //     id: user.uid,
          //   })
          // );
        })
        .catch(console.error);
    },
    [dispatch]
  );

  const { isAuth } = useAuth();

  useEffect(() => {}, []);
  return (
    <div className={'public-form'}>
      <h2 className={'public-form__title'}>Sign In</h2>
      <Form title={'Log In'} handleClick={handleLogIn} />
      <span className={'public-form__additional-info'}>
        If you do not have an account <Link to={'/register'}>sign up</Link>
      </span>
      {isAuth && <Navigate to={'/home'} replace={true} />}
    </div>
  );
}

export default SignInForm;
