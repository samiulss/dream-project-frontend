import axios from 'axios';
import toast from 'react-hot-toast';
import { rootUrl } from '../../../config/backendUrl';
import { config } from '../../../config/tokenVerify';
import { ContentState } from '../../context/StateContext';
import './followingList.scss';

function FollowingList({ followingSeller }) {
  const { auth, fetchAgain, setFetchAgain } = ContentState();

  const { name, email, _id } = followingSeller;

  // HANDLE UNFOLLOW SELLER
  const handleUnfollow = async (uId) => {
    const userId = {
      id: uId,
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
      console.log(error.message);
    }
  };
  return (
    <div className="m-portlet__body d-flex align-items-center">
      <div className="m-widget4__img m-widget4__img--pic" role="button">
        <img
          src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava3.webp"
          alt=""
        />
      </div>
      <div className="m-widget4__info">
        <span className="m-widget4__title fw-semibold">{name}</span>
        <br />
        <span className="m-widget4__sub">{email}</span>
      </div>
      <div className="m-widget4__ext">
        <button
          onClick={() => handleUnfollow(_id)}
          className="btn base-bg-color-1 text-white"
        >
          Unfollow
        </button>
      </div>
    </div>
  );
}

export default FollowingList;