import { useEffect, useState } from 'react';
import Login from '../modals/login/Login';
import './joinButtons.scss';

function JoinButtons() {
  const [user, setUser] = useState(null);
  const data = JSON.parse(localStorage.getItem('user'));
  useEffect(() => {
    setUser(data);
  }, []);
  return (
    <>
      <div className="login-signup mb-3">
        {!user && <Login />}
      </div>
      <div className="be-a-seller">
        <button type="button" className="btn seller-btn gradient-button border rounded-5">Become a seller</button>
      </div>
    </>
  );
}

export default JoinButtons;
