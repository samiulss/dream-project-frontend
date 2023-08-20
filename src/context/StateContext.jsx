/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import jwtDecode from 'jwt-decode';
import { createContext, useContext, useState } from 'react';

const State = createContext();

function StateContext({ children }) {
  const token = localStorage.getItem('token');
  const tempLogin = sessionStorage.getItem('token');
  let decode;
  if (token) {
    decode = jwtDecode(token);
  }
  if (!token && tempLogin) {
    decode = jwtDecode(tempLogin);
  }
  const [loading, setLoading] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(decode);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [auth, setAuth] = useState(token || tempLogin);
  const [notifications, setNotifications] = useState(false);
  const [homeSearch, setHomeSearch] = useState(false);
  const [contents, setContents] = useState([]);
  const [catagory, setCatagory] = useState(null);
  const [resultFor, setResultFor] = useState('');
  const [fetchAgain, setFetchAgain] = useState(false);
  const [popUpModal, setPopUpModal] = useState(false);
  const [onScreen, setOnScreen] = useState(false);
  const [onScreenData, setOnScreenData] = useState({});
  const [showCanvas, setShowCanvas] = useState(false);
  const [userData, setUserData] = useState(null);
  const [favourites, setFavourites] = useState([]);
  const [followList, setFollowList] = useState([]);
  const [downloadHistory, setDownloadHistory] = useState([]);
  return (
    <State.Provider value={{
      loading,
      setLoading,
      loggedInUser,
      setLoggedInUser,
      auth,
      setAuth,
      showLoginModal,
      setShowLoginModal,
      notifications,
      setNotifications,
      contents,
      setContents,
      catagory,
      setCatagory,
      homeSearch,
      setHomeSearch,
      resultFor,
      setResultFor,
      fetchAgain,
      setFetchAgain,
      popUpModal,
      setPopUpModal,
      onScreen,
      setOnScreen,
      onScreenData,
      setOnScreenData,
      showCanvas,
      setShowCanvas,
      userData,
      setUserData,
      favourites,
      setFavourites,
      followList,
      setFollowList,
      downloadHistory,
      setDownloadHistory
    }}
    >
      {children}
    </State.Provider>
  );
}

export const ContentState = () => useContext(State);

export default StateContext;
