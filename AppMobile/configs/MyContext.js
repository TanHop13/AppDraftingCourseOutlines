import React, { createContext, useState } from 'react'

const MyContext = createContext();
const MyDispatcherContext = createContext();

const MyProvider = ({ children }) => {
    const [userInfo, setUserInfo] = useState(null);
    const [myLocation, setMyLocation] = useState();
    const logout = () => {
      setUserInfo(null);
    };
  
    const isAuthenticated = () => userInfo != null
  
    return (
      <MyContext.Provider value={{ userInfo,  setUserInfo , isAuthenticated, logout, setMyLocation, myLocation}}>
        {children}
      </MyContext.Provider>
    );
  };
  
  export { MyProvider, MyContext, MyDispatcherContext };