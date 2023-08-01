/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useContext, useState } from 'react';

const State = createContext();

function StateContext({ children }) {
  const [getContent, setGetContent] = useState();
  const [user, setUser] = useState();
  return (
    <State.Provider value={{
      getContent,
      setGetContent,
      user,
      setUser
    }}
    >
      {children}
    </State.Provider>
  );
}

export const ContentState = () => useContext(State);

export default StateContext;
