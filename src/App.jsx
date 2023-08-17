import { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import AdminLogin from './adminPanel/pages/adminLogin/AdminLogin';
import AdminHome from './adminPanel/pages/home/AdminHome';
import SellerContentProfile from './components/sellerContentsProfile/SellerContentProfile';
import Content from './pages/content/Content';
import DashBoard from './pages/dashBoard/DashBoard';
import Download from './pages/download/Download';
import Home from './pages/home/Home';
import NotFound from './pages/notFound/NotFound';
import PrivateRoute from './privateRoute/PrivateRoute';
import SellerProtection from './privateRoute/SellerProtection';

function App() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return (
    <Routes>
      <Route index element={<Home />} />
      <Route path="/contents" element={<Content />} />
      <Route path="/seller/:sellerId" element={<SellerContentProfile />} />
      <Route path="/download/:contentId" element={<Download />} />
      <Route element={<PrivateRoute />}>
        <Route path="/profile" element={<DashBoard />} />
        <Route path="/following" element={<DashBoard />} />
        <Route path="/favourite" element={<DashBoard />} />
      </Route>
      <Route element={<SellerProtection />}>
        <Route path="/upload" element={<DashBoard />} />
        <Route path="/message" element={<DashBoard />} />
        <Route path="/file-status" element={<DashBoard />} />
        <Route path="/balance" element={<DashBoard />} />
        <Route path="/download-list" element={<DashBoard />} />
        <Route path="/my-content" element={<DashBoard />} />
      </Route>
      <Route path="/*" element={<NotFound />} />

      {/* ---------------ADMIN ROUTE--------------- */}
      <Route path="/admin-panel" element={<AdminLogin />} />
      <Route path="/admin-panel/pending" element={<AdminHome />} />
    </Routes>
  );
}

export default App;
