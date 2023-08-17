import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import { ContentState } from '../../context/StateContext';
import ContentList from '../contentList/ContentList';
import Help from '../help/Help';
import SocialHandle from '../socialHandle/SocialHandle';
import UserSkills from '../userSkills/UserSkills';
import './profile.scss';

function Profile({ fullDetails, contents, sellerProfile }) {
  const {
    auth, loggedInUser, fetchAgain, setFetchAgain
  } = ContentState();
  const [userData, setUserData] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [followingSeller, setFollowingSeller] = useState([]);
  const [editProfile, setEditProfile] = useState(false);
  const [infoChange, setInfoChange] = useState(false);
  const [editLink, setEditLink] = useState(false);
  const [editSkill, seteditSkill] = useState(false);
  const [socialSkillName, setSocialSkillName] = useState(null);

  const [editProfileValues, setEditProfileValues] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    socialHandle: [],
    skills: [],
  });

  const firstName = userData?.name.split(' ');

  const fetchUserDetails = async () => {
    if (!loggedInUser) {
      return;
    }
    try {
      const { data } = await axios.get(`${rootUrl}/api/user`, config(auth));
      setUserData(data);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchUserDetails();
  }, [fetchAgain]);

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

  const inputRef = useRef();
  useEffect(() => {
    if (editProfile && !editLink && !editSkill) {
      inputRef.current.focus();
    }
  }, [editProfile]);

  const getSocialSkillsName = (nam) => {
    setSocialSkillName(nam);
  };

  // handle socail and skill change values
  const handleValue = (index) => (e) => {
    setEditProfile(true);
    const getvalues = e.target.value;
    const getNames = e.target.name;

    function findIndex(item) {
      return item.name === socialSkillName;
    }

    if (getNames === 'socialHandle') {
      const socialNam = {
        name: socialSkillName,
        link: getvalues,
      };

      const getName = editProfileValues.socialHandle.map((item) => item.name);
      if (!getName.includes(socialSkillName)) {
        editProfileValues.socialHandle.push(socialNam);
      } else {
        const idx = editProfileValues.socialHandle.findIndex(findIndex);
        editProfileValues.socialHandle[idx].link = getvalues;
      }
      setInfoChange(true);
    }

    if (getNames === 'skills') {
      const skillNam = {
        name: socialSkillName,
        value: getvalues,
      };
      const getName = editProfileValues.skills.map((item) => item.name);
      if (!getName.includes(socialSkillName)) {
        editProfileValues.skills.push(skillNam);
      } else {
        const idx = editProfileValues.skills.findIndex(findIndex);
        editProfileValues.skills[idx].value = getvalues;
      }
      setInfoChange(true);
    }
  };

  const getChangingValues = (e) => {
    const getvalues = e.target.value;
    const getNames = e.target.name;

    if (getNames === 'socialLink') {
      setInfoChange(true);
      setEditProfile(true);
      const socialNam = {
        name: socialSkillName,
        link: getvalues,
      };

      const getName = editProfileValues.socialHandle?.map((item) => item.name);
      if (!getName.includes(socialSkillName)) {
        editProfileValues.socialHandle.push(socialNam);
      } else {
        editProfileValues.socialHandle[0].link = getvalues;
      }
    }
    if (getNames === 'value') {
      setInfoChange(true);
      setEditProfile(true);
      const socialNam = {
        name: socialSkillName,
        value: getvalues,
      };

      const getName = editProfileValues.skills.map((item) => item.name);
      if (!getName.includes(socialSkillName)) {
        editProfileValues.skills.push(socialNam);
      } else {
        editProfileValues.skills[0].value = getvalues;
      }
    }
  };

  // handle user info change values
  const handleInfoChange = (e) => {
    setEditProfileValues({
      ...editProfileValues,
      [e.target.name]: e.target.value,
    });
    setInfoChange(true);
    setEditProfile(true);
  };

  // handle update profile
  const handleProfileUpdate = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        `${rootUrl}/api/updateProfile`,
        editProfileValues,
        config(auth)
      );
      toast.success(data);
      setFetchAgain(!fetchAgain);
      setEditProfile(false);
      setEditLink(false);
      seteditSkill(false);
    } catch (error) {
      toast.error(error.message);
      console.log(error);
    }
  };

  useEffect(() => {
    favouriteContents();
    checkFollower();
  }, [fetchAgain]);

  // console.log(editProfileValues);

  return (
    <section className="pb-3">
      <div className={fullDetails ? 'container pt-3' : 'container-fluid pt-3'}>
        <form onSubmit={handleProfileUpdate}>
          <div className="row">
            <div className="col-lg-4">
              {/* ------------PROFILE CARD CONTENTR------------ */}
              <div className="card mb-4">
                <div className="card-body text-center position-relative">
                  <img
                    src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
                    alt="avatar"
                    className="rounded-circle img-fluid"
                    style={{ width: '150px' }}
                  />
                  <h5 className="my-3">
                    {fullDetails && firstName
                      ? firstName[0]
                      : sellerProfile?.name}
                  </h5>
                  {!fullDetails && (
                    <p>
                      Resources(
                      {contents?.length}
                      )
                    </p>
                  )}
                  {/* <p className="text-muted mb-1">Graphic Designer</p> */}
                  <p className="text-muted mb-2">
                    {userData?.address && userData?.address}
                  </p>
                  {!fullDetails && loggedInUser?.id !== sellerProfile?._id && (
                    <div className="d-flex justify-content-center mb-2">
                      {followingSeller.find(
                        (seller) => seller._id === sellerProfile?._id
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
                  {fullDetails && !editProfile && (
                    <i
                      className="fa-solid fa-user-pen fs-4 text-dark position-absolute top-0 end-0 me-3 mt-3"
                      role="button"
                      onClick={() => setEditProfile(true)}
                    />
                  )}
                </div>
              </div>

              {/* ------------SOCIAL LINK CONTENTR------------ */}
              <div className="card mb-4 mb-lg-4">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <p className="mb-0 fw-semibold">Social Links</p>
                    {fullDetails && (
                      <span
                        onClick={() => {
                          setEditLink(!editLink);
                          setEditProfile(false);
                        }}
                        className={`btn ${
                          editLink ? 'bg-danger' : 'bg-primary'
                        } text-white rounded-5 add-btn-social-skill`}
                      >
                        {editLink ? 'Cancel' : 'Add Link'}
                      </span>
                    )}
                  </div>
                  <ul className="list-group list-group-flush rounded-3">
                    {fullDetails
                      ? userData?.socialHandle.map((item, i) => (
                        <SocialHandle
                          key={item._id}
                          item={item}
                          index={i}
                          editProfile={editProfile}
                          handleValue={handleValue}
                          getSocialSkillsName={getSocialSkillsName}
                        />
                      ))
                      : sellerProfile?.socialHandle.map((item) => (
                        <SocialHandle key={item._id} item={item} />
                      ))}
                  </ul>
                  {editLink && (
                    <div className="d-flex">
                      <select
                        onChange={getChangingValues || handleValue}
                        name="socialHandle"
                        onClick={(e) => getSocialSkillsName(e.target.value)}
                      >
                        <option defaultChecked>Choose...</option>
                        <option value="Website">Website</option>
                        <option value="Facebook">Facebook</option>
                        <option value="Instagram">Instagram</option>
                        <option value="Dribble">Dribble</option>
                      </select>
                      <input
                        type="text"
                        className="form-control shadow-none"
                        onChange={getChangingValues || handleValue}
                        name="socialLink"
                        maxLength="200"
                      />
                    </div>
                  )}
                </div>
              </div>

              {/* ------------SKILLS STATUS CONTENTR------------ */}
              <div className="card mb-4 mb-md-4">
                <div className="card-body">
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <p className="mb-0 fw-semibold"> Sklills status</p>
                    {fullDetails && (
                      <span
                        onClick={() => {
                          seteditSkill(!editSkill);
                          setEditProfile(false);
                        }}
                        className={`btn ${
                          editSkill ? 'bg-danger' : 'bg-primary'
                        } text-white rounded-5 add-btn-social-skill`}
                      >
                        {editSkill ? 'Cancel' : 'Add skill'}
                      </span>
                    )}
                  </div>
                  {fullDetails
                    ? userData?.skills.map((item, i) => (
                      <UserSkills
                        key={item._id}
                        item={item}
                        index={i}
                        handleValue={handleValue}
                        editProfile={editProfile}
                        getSocialSkillsName={getSocialSkillsName}
                      />
                    ))
                    : sellerProfile?.skills.map((item) => (
                      <UserSkills key={item._id} item={item} />
                    ))}
                  {editSkill && (
                    <div className="d-flex">
                      <select
                        onChange={getChangingValues || handleValue}
                        name="skills"
                        onClick={(e) => getSocialSkillsName(e.target.value)}
                      >
                        <option defaultChecked>Choose...</option>
                        <option value="Web Design">Web Design</option>
                        <option value="Graphic Design">Graphic Design</option>
                        <option value="Photo Shop">Photo Shop</option>
                        <option value="illustration">illustration</option>
                      </select>
                      <input
                        type="number"
                        className="form-control shadow-none"
                        onChange={getChangingValues || handleValue}
                        name="value"
                      />
                    </div>
                  )}
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
                          {!editProfile && (
                            <p className="text-muted mb-0">{userData?.name}</p>
                          )}
                          {editProfile && (
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleInfoChange}
                              name="name"
                              maxLength="50"
                              ref={inputRef}
                              defaultValue={userData?.name}
                            />
                          )}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Email</p>
                        </div>
                        <div className="col-sm-9">
                          {!editProfile && (
                            <p className="text-muted mb-0">{userData?.email}</p>
                          )}
                          {editProfile && (
                            <input
                              type="email"
                              className="form-control"
                              onChange={handleInfoChange}
                              name="email"
                              maxLength="50"
                              defaultValue={userData?.email}
                            />
                          )}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Mobile</p>
                        </div>
                        <div className="col-sm-9">
                          {!editProfile && (
                            <p className="text-muted mb-0">
                              {userData?.phone ? userData?.phone : 'null'}
                            </p>
                          )}
                          {editProfile && (
                            <input
                              type="number"
                              className="form-control"
                              onChange={handleInfoChange}
                              name="phone"
                              defaultValue={userData?.phone}
                            />
                          )}
                        </div>
                      </div>
                      <hr />
                      <div className="row">
                        <div className="col-sm-3">
                          <p className="mb-0">Address</p>
                        </div>
                        <div className="col-sm-9">
                          {!editProfile && (
                            <p className="text-muted mb-0">
                              {userData?.address ? userData?.address : 'null'}
                            </p>
                          )}
                          {editProfile && (
                            <input
                              type="text"
                              className="form-control"
                              onChange={handleInfoChange}
                              name="address"
                              maxLength="50"
                              defaultValue={userData?.address}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    {/* ------------ACCOUNT STATUS CONTENTR------------ */}
                    <div className="col-md-12">
                      <div className="card mb-4 mb-md-0 pb-4">
                        <div className="card-body m-auto d-flex flex-column align-items-center">
                          <p className="mb-4 fw-semibold"> Account Status</p>
                          {userData?.restiction === 0 && (
                            <div
                              style={{
                                backgroundColor: 'limegreen',
                              }}
                              className="account-status d-flex align-items-center justify-content-center rounded-circle"
                              title="No restiction"
                            >
                              <i className="fa-solid fa-circle-check fs-1" />
                            </div>
                          )}
                          {userData?.restiction === 1 && (
                            <div
                              style={{
                                backgroundColor: '#eee',
                              }}
                              className="account-status d-flex align-items-center justify-content-center rounded-circle"
                              title="Warning"
                            >
                              <i className="fa-solid fa-triangle-exclamation text-warning fs-1" />
                            </div>
                          )}
                          {userData?.restiction === 3 && (
                            <div
                              style={{
                                backgroundColor: 'red',
                              }}
                              className="account-status d-flex align-items-center justify-content-center rounded-circle"
                              title="Resticted"
                            >
                              <i className="fa-solid fa-circle-xmark fs-1" />
                            </div>
                          )}
                        </div>
                      </div>
                      {fullDetails && editProfile && (
                        <div
                          style={{ gap: '20px' }}
                          className="mt-4 d-flex action-buttons justify-content-center"
                        >
                          <button
                            className="btn bg-danger text-white rounded-5"
                            type="reset"
                            onClick={() => {
                              setEditProfile(false);
                              setInfoChange(false);
                            }}
                          >
                            Cancle
                          </button>
                          <button
                            className="btn bg-success text-white rounded-5"
                            type="submit"
                            disabled={!infoChange}
                          >
                            Update
                          </button>
                        </div>
                      )}
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
        </form>
      </div>
      {!fullDetails && <Help />}
    </section>
  );
}

export default Profile;
