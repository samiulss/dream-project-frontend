import { useState } from 'react';
import { ContentState } from '../../context/StateContext';
import Login from '../modals/login/Login';
import PopUpModal from '../modals/popUpModal/PopUpModal';
import './joinButtons.scss';

function JoinButtons() {
  const { loggedInUser, setShowLoginModal, setPopUpModal } = ContentState();
  const [btn, setBtn] = useState('login');

  const beSellarBtn = () => {
    if (!loggedInUser) {
      setShowLoginModal(true);
    } else {
      setPopUpModal(true);
    }
  };
  return (
    <>
      {!loggedInUser && (
      <div className="login-signup mb-3">
        <button onClick={() => { setShowLoginModal(true); setBtn('login'); }} type="button" className="btn btn-login gradient-button border rounded-5">Log In</button>
        <button onClick={() => { setShowLoginModal(true); setBtn('signup'); }} type="button" className="btn btn-signup gradient-button border rounded-5 text-white">Sign Up</button>
        <Login btn={btn} setBtn={setBtn} />
      </div>
      )}
      <div className="be-a-seller">
        {(loggedInUser?.role === 'user' || !loggedInUser) && <button onClick={beSellarBtn} type="button" className="btn seller-btn gradient-button border rounded-5">Become a seller</button>}
      </div>
      <PopUpModal beSellear />
    </>
  );
}

export default JoinButtons;
