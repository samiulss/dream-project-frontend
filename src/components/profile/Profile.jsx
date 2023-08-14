import axios from 'axios';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import { ContentState } from '../../context/StateContext';
import ContentList from '../contentList/ContentList';
import Help from '../help/Help';
import './profile.scss';

function Profile({ fullDetails, contents }) {
  const {
    auth, loggedInUser, fetchAgain, setFetchAgain
  } = ContentState();
  const [favourites, setFavourites] = useState([]);
  const [followingSeller, setFollowingSeller] = useState([]);

  // FETCH FAVOURITE CONTENT
  const favouriteContents = async () => {
    if (!loggedInUser) {
      return;
    }
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/favouriteList`,
        config(auth)
      );
      setFavourites(data[0].favourite);
    } catch (error) {
      toast.error(error.message);
    }
  };

  //
  const checkFollower = async () => {
    if (!loggedInUser) {
      return;
    }
    try {
      const { data } = await axios.get(
        `${rootUrl}/api/followingList`,
        config(auth)
      );
      setFollowingSeller(data[0].following);
    } catch (error) {
      console.log(error.message);
    }
  };

  // HANDLE FOLLOW SELLER
  const handleFollow = async () => {
    if (!loggedInUser) {
      toast.error('Please log in first');
      return;
    }
    const userId = {
      id: contents[0].author._id,
    };
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/followPeople`,
        userId,
        config(auth)
      );
      toast.success(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // HANDLE UNFOLLOW SELLER
  const handleUnfollow = async () => {
    const userId = {
      id: contents[0].author._id,
    };
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/unfollowPeople`,
        userId,
        config(auth)
      );
      toast.success(data);
      setFetchAgain(!fetchAgain);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    favouriteContents();
    checkFollower();
  }, [fetchAgain]);

  return (
    <section className="pb-3" style={{ backgroundColor: '#eee' }}>
      <div className={fullDetails ? 'container pt-3' : 'container-fluid pt-3'}>
        <div className="row">
          <div className="col-lg-4">
            {/* ------------PROFILE CARD CONTENTR------------ */}
            <div className="card mb-4">
              <div className="card-body text-center">
                <img
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                  alt="avatar"
                  className="rounded-circle img-fluid"
                  style={{ width: '150px' }}
                />
                <h5 className="my-3">
                  {fullDetails ? loggedInUser.name : contents[0]?.author.name}
                </h5>
                <p className="text-muted mb-1">Graphic Designer</p>
                <p className="text-muted mb-4">Dinajpur Sadar, Dinajpur, BD</p>
                {(!fullDetails && loggedInUser?.id !== contents[0]?.author._id) && (
                <div className="d-flex justify-content-center mb-2">
                  {followingSeller.find(
                    (seller) => seller._id === contents[0]?.author._id
                  ) ? (
                    <button
                      onClick={handleUnfollow}
                      type="button"
                      className="btn btn-primary"
                    >
                      Unfollow
                    </button>
                    ) : (
                      <button
                        onClick={handleFollow}
                        type="button"
                        className="btn btn-primary"
                      >
                        Follow
                      </button>
                    )}
                </div>
                )}
              </div>
            </div>

            {/* ------------SOCIAL LINK CONTENTR------------ */}
            <div className="card mb-4 mb-lg-0">
              <div className="card-body p-0">
                <ul className="list-group list-group-flush rounded-3">
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i className="fas fa-globe fa-lg text-warning" />
                    <p className="mb-0">https://example.com</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-github fa-lg"
                      style={{ color: '#333333' }}
                    />
                    <p className="mb-0">example</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-twitter fa-lg"
                      style={{ color: '#55acee' }}
                    />
                    <p className="mb-0">@example</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-instagram fa-lg"
                      style={{ color: '#ac2bac' }}
                    />
                    <p className="mb-0">example</p>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center p-3">
                    <i
                      className="fab fa-facebook-f fa-lg"
                      style={{ color: '#3b5998' }}
                    />
                    <p className="mb-0">example</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-lg-8">
            {/* ------------FULL DETAILS CONTENTR------------ */}
            {fullDetails ? (
              <>
                <div className="card mb-4">
                  <div className="card-body">
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Full Name</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{loggedInUser.name}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Email</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">{loggedInUser.email}</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Phone</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">01783086680</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Mobile</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">01783086680</p>
                      </div>
                    </div>
                    <hr />
                    <div className="row">
                      <div className="col-sm-3">
                        <p className="mb-0">Address</p>
                      </div>
                      <div className="col-sm-9">
                        <p className="text-muted mb-0">
                          Dinajpur Sadar, Dinajpur, BD
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4"> Project Status</p>
                        <p className="mb-1" style={{ fontSize: '.77rem' }}>
                          Web Design
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: '5px' }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '80%' }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                          Website Markup
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: '5px' }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '72%' }}
                            aria-valuenow={72}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                          One Page
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: '5px' }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '89%' }}
                            aria-valuenow={89}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                          Mobile Template
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: '5px' }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '55%' }}
                            aria-valuenow={55}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                          Backend API
                        </p>
                        <div
                          className="progress rounded mb-2"
                          style={{ height: '5px' }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '66%' }}
                            aria-valuenow={66}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6">
                    <div className="card mb-4 mb-md-0">
                      <div className="card-body">
                        <p className="mb-4"> Project Status</p>
                        <p className="mb-1" style={{ fontSize: '.77rem' }}>
                          Web Design
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: '5px' }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '80%' }}
                            aria-valuenow={80}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                          Website Markup
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: '5px' }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '72%' }}
                            aria-valuenow={72}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                          One Page
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: '5px' }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '89%' }}
                            aria-valuenow={89}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                          Mobile Template
                        </p>
                        <div
                          className="progress rounded"
                          style={{ height: '5px' }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '55%' }}
                            aria-valuenow={55}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                        <p className="mt-4 mb-1" style={{ fontSize: '.77rem' }}>
                          Backend API
                        </p>
                        <div
                          className="progress rounded mb-2"
                          style={{ height: '5px' }}
                        >
                          <div
                            className="progress-bar"
                            role="progressbar"
                            style={{ width: '66%' }}
                            aria-valuenow={66}
                            aria-valuemin={0}
                            aria-valuemax={100}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="my-content-scroll">
                <div className="my-content-section w-100">
                  {contents.map((content) => (
                    <ContentList
                      key={content._id}
                      content={content}
                      favourites={favourites}
                      tooltip
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {!fullDetails && <Help />}
    </section>
  );
}

export default Profile;
