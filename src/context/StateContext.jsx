/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import jwtDecode from 'jwt-decode';
import { createContext, useContext, useState } from 'react';

const State = createContext();

function StateContext({ children }) {
  const [getContent, setGetContent] = useState(null);
  const token = localStorage.getItem('token');
  let decode;
  if (token) {
    decode = jwtDecode(token);
  }
  const [loggedInUser, setLoggedInUser] = useState(decode);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [auth, setAuth] = useState(token);
  const [contents, setContents] = useState([]);
  const [fetchAgain, setFetchAgain] = useState(false);
  const [popUpModal, setPopUpModal] = useState(false);
  const [menuCatagory, setMenuCatagory] = useState(null);
  const [homeSearch, setHomeSearch] = useState(false);
  return (
    <State.Provider value={{
      getContent,
      setGetContent,
      loggedInUser,
      setLoggedInUser,
      auth,
      setAuth,
      showLoginModal,
      setShowLoginModal,
      contents,
      setContents,
      homeSearch,
      setHomeSearch,
      fetchAgain,
      setFetchAgain,
      popUpModal,
      setPopUpModal,
      menuCatagory,
      setMenuCatagory
    }}
    >
      {children}
    </State.Provider>
  );
}

export const ContentState = () => useContext(State);

export default StateContext;
