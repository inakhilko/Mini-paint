import { Navigate, Route, Routes } from 'react-router-dom';
import SignInPage from '../pages/SignInPage';
import SignUpPage from '../pages/SignUpPage';

function PublicRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to={'/login'} />} />
      <Route path="/login" element={<SignInPage />} />
      <Route path="/register" element={<SignUpPage />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
}

export default PublicRouter;
