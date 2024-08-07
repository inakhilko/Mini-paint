import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PaintPage from '../pages/PaintPage';

function PrivateRouter() {
  return (
    <Routes>
      <Route path={'home'} element={<HomePage />} />
      <Route path={'paint'} element={<PaintPage />}>
        <Route path={'new'} element={<PaintPage />} />
        <Route path={':imageId'} element={<PaintPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/home" />} />
    </Routes>
  );
}

export default PrivateRouter;
