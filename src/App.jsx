/* eslint-disable react/no-unstable-nested-components */
import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminHome from './adminPanel/pages/home/AdminHome';
import Content from './pages/content/Content';
import DashBoard from './pages/dashBoard/DashBoard';
import Download from './pages/download/Download';
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';
import PrivateRoute from './privateRoute/PrivateRoute';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/admin-panel" element={<AdminHome />} />
      <Route path="/content" element={<Content />} />
      <Route path="/download/:contentId" element={<Download />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<DashBoard />} />
        <Route path="/dashboard" element={<DashBoard />} />
        <Route path="/message" element={<DashBoard />} />
        <Route path="/file-status" element={<DashBoard />} />
        <Route path="/balance" element={<DashBoard />} />
        <Route path="/download-list" element={<DashBoard />} />
        <Route path="/my-content" element={<DashBoard />} />
      </Route>
      <Route path="/*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
