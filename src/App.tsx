import './App.scss';
import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from './pages/SignInPage';
import SignUpPage from './pages/SignUpPage';
import HomePage from './pages/HomePage';
import PaintPage from './pages/PaintPage';
import { useDispatch } from 'react-redux';
import { setUser } from './store/slices/UserSlice.ts';

function App() {
  const dispatch = useDispatch();
  const user = localStorage.getItem('user');
  if (user) {
    dispatch(setUser(JSON.parse(user)));
  }
  return (
    <>
      {localStorage.getItem('user') && <Navigate to={'/home'} />}
      <Routes>
        <Route path="/" element={<Navigate to={'/home'} />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignUpPage />} />
        <Route path="/paint" element={<PaintPage />} />
      </Routes>
    </>
  );
}

export default App;
