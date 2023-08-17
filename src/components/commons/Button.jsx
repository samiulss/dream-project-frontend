import { ContentState } from '../../context/StateContext';
import PopUpModal from '../modals/popUpModal/PopUpModal';
import './button.scss';

function Button({ btn }) {
  const { loggedInUser, setShowLoginModal, setPopUpModal } = ContentState();
  return (
    <div className="common row align-items-center text-center p-5">
      <div className="col-md-8">
        {btn === 'signUp' && !loggedInUser ? (
          <div>
            <h2 className="text-dark">
              <span className="base-color-1">Create an account</span>
              {' '}
              to enjoy
              more free downloads
            </h2>
          </div>
        ) : (
          (!loggedInUser || loggedInUser.role === 'user') && (
            <h2 className="text-dark">
              Join our
              {' '}
              <span className="base-color-1">Creator Community</span>
            </h2>
          )
        )}
      </div>

      <div className="col-md-4">
        {btn === 'signUp' && (
          <button
            type="button"
            onClick={() => setShowLoginModal(true)}
            className="btn gradient-button border-0 rounded-1"
          >
            Sign Up
          </button>
        )}

        {btn !== 'signUp'
          && (!loggedInUser || loggedInUser?.role === 'user') && (
            <button
              type="button"
              onClick={() => setPopUpModal(true)}
              className="btn gradient-button border-0 rounded-1"
            >
              Become a seller
            </button>
        )}
      </div>
      <PopUpModal beSellear />
    </div>
  );
}

export default Button;
