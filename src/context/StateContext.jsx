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
  const [loggedInUser, setLoggedInUser] = useState(decode);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [auth, setAuth] = useState(token || tempLogin);
  const [contents, setContents] = useState([]);
  const [catagory, setCatagory] = useState(null);
  const [resultFor, setResultFor] = useState('');
  const [fetchAgain, setFetchAgain] = useState(false);
  const [popUpModal, setPopUpModal] = useState(false);
  const [homeSearch, setHomeSearch] = useState(false);
  return (
    <State.Provider value={{
      loggedInUser,
      setLoggedInUser,
      auth,
      setAuth,
      showLoginModal,
      setShowLoginModal,
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
    }}
    >
      {children}
    </State.Provider>
  );
}

export const ContentState = () => useContext(State);

export default StateContext;
