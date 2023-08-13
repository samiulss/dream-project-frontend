/* eslint-disable react/prop-types */
import { ContentState } from '../../context/StateContext';
import './button.scss';

function Button({ btn }) {
  const { loggedInUser } = ContentState();
  return (
    <div className="common row align-items-center text-center p-5">
      <div className="col-md-8">
        {btn === 'signUp' ? (
          <h2 className="text-dark">
            <span className="base-color-1">Create an account</span>
            {' '}
            to enjoy
            more free downloads
          </h2>
        ) : (
          <h2 className="text-dark">
            Join our
            {' '}
            <span className="base-color-1">Creator Community</span>
          </h2>
        )}
      </div>

      <div className="col-md-4">
        {btn === 'signUp' && !loggedInUser ? (
          <button
            type="button"
            className="btn gradient-button border-0 rounded-1"
            data-bs-toggle="modal"
            data-bs-target="#staticBackdrop"
          >
            Sign Up
          </button>
        ) : (
          <>
            {loggedInUser?.role === 'user'
            && (
            <button
              type="button"
              className="btn gradient-button border-0 rounded-1"
            >
              Become a seller
            </button>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Button;
