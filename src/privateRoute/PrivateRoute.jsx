/* eslint-disable no-underscore-dangle */
import { Navigate, Outlet } from 'react-router-dom';
import { ContentState } from '../context/StateContext';

function PrivateRoute() {
  const { loggedInUser } = ContentState();

  return (
    loggedInUser ? <Outlet /> : <Navigate to="/" />
  );
}

export default PrivateRoute;
