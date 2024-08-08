import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/UserSlice.ts';
import { useAuth } from './store/hooks/useAuth.ts';
import PublicRouter from './router/PublicRouter.tsx';
import PrivateRouter from './router/PrivateRouter.tsx';
import './App.scss';

function App() {
  const dispatch = useDispatch();
  const { isAuth } = useAuth();
  useEffect(() => {
    const user = localStorage.getItem('paintUser');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);
  return <>{isAuth ? <PrivateRouter /> : <PublicRouter />}</>;
}

export default App;
