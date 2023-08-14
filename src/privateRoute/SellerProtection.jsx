import { Navigate, Outlet } from 'react-router-dom';
import { ContentState } from '../context/StateContext';

function SellerProtection() {
  const { loggedInUser } = ContentState();
  return (
    loggedInUser?.role === 'seller' ? <Outlet /> : <Navigate to="/" />
  );
}

export default SellerProtection;
