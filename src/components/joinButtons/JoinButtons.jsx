import { useState } from 'react';
import { ContentState } from '../../context/StateContext';
import Login from '../modals/login/Login';
import './joinButtons.scss';

function JoinButtons() {
  const { loggedInUser, setShowLoginModal } = ContentState();
  const [btn, setBtn] = useState('login');
  return (
    <>
      {!loggedInUser && (
      <div className="login-signup mb-3">
        <button onClick={() => { setShowLoginModal(true); setBtn('login'); }} type="button" className="btn btn-login gradient-button border rounded-5">Log In</button>
        <button onClick={() => { setShowLoginModal(true); setBtn('signup'); }} type="button" className="btn btn-signup border rounded-5 text-white">Sign Up</button>
        <Login btn={btn} setBtn={setBtn} />
      </div>
      )}
      <div className="be-a-seller">
        <button type="button" className="btn seller-btn gradient-button border rounded-5">Become a seller</button>
      </div>
    </>
  );
}

export default JoinButtons;
