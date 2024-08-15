import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as fbAuth from 'firebase/auth';
import { auth } from './firebase.ts';
import { removeUser, setUser } from './store/slices/UserSlice.ts';
import { useAuth } from './store/hooks/useAuth.ts';
import PublicRouter from './router/PublicRouter.tsx';
import PrivateRouter from './router/PrivateRouter.tsx';
import Loader from './UI/Loader';
import './App.scss';

const { onAuthStateChanged } = fbAuth;

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        dispatch(
          setUser({ email: user.email, token: user.accessToken, id: user.uid })
        );
      } else {
        dispatch(removeUser());
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [dispatch]);

  if (loading) {
    return <Loader />;
  }

  return isAuth ? <PrivateRouter /> : <PublicRouter />;
}

export default App;
