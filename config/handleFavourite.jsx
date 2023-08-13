import axios from 'axios';
import toast from 'react-hot-toast';
import { ContentState } from '../src/context/StateContext';
import { rootUrl } from './backendUrl';
import { config } from './tokenVerify';

const {
  auth, loggedInUser, fetchAgain, setFetchAgain
} = ContentState();

// HANDLE FAVOURITE
export const handleFavourite = async (id) => {
  if (!loggedInUser) {
    toast.error('Please log in first');
    return;
  }
  const selectContent = {
    contentId: id,
  };
  try {
    const { data } = await axios.post(
      `${rootUrl}/api/addFevourite`,
      selectContent,
      config(auth)
    );
    toast.success(data);
    setFetchAgain(!fetchAgain);
  } catch (error) {
    toast.error(error.message);
  }
};

// HANDLE UNFAVOURITE
export const handleUnfavourite = async (id) => {
  const selectContent = {
    contentId: id,
  };
  try {
    const { data } = await axios.post(
      `${rootUrl}/api/removeFevourite`,
      selectContent,
      config(auth)
    );
    toast.success(data);
    setFetchAgain(!fetchAgain);
  } catch (error) {
    toast.error(error.message);
  }
};
