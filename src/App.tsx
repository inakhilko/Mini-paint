import './App.scss';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/slices/UserSlice.ts';
import PublicRouter from './router/PublicRouter.tsx';
import PrivateRouter from './router/PrivateRouter.tsx';

function App() {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.user.isAuth);
  useEffect(() => {
    const user = localStorage.getItem('paintUser');
    if (user) {
      dispatch(setUser(JSON.parse(user)));
    }
  }, [dispatch]);
  return <>{isLoggedIn ? <PrivateRouter /> : <PublicRouter />}</>;
}

export default App;
