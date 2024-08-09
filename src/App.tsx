import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import * as fbAuth from 'firebase/auth';
import { removeUser, setUser } from './store/slices/UserSlice.ts';
import { useAuth } from './store/hooks/useAuth.ts';
import PublicRouter from './router/PublicRouter.tsx';
import PrivateRouter from './router/PrivateRouter.tsx';
import Loader from './UI/Loader';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  const { getAuth, onAuthStateChanged } = fbAuth;
  const auth = getAuth();
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
  }, [auth, dispatch, onAuthStateChanged]);

  if (loading) {
    return <Loader />;
  }

  return isAuth ? <PrivateRouter /> : <PublicRouter />;
}

export default App;
