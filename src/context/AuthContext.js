import axios from 'axios';
import React, { createContext, useState } from 'react'

export const AuthContext = createContext();

const AuthContextProvider = ({children}) =>{

  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState({})

    const signIn = async ( username , password )=>{
        try {
          const res = await axios.post("api/auth/login", { username, password });
            const {foundUser , encodedToken} = res.data;
            localStorage.setItem("token" , encodedToken)
            setUser(foundUser);
            setLoggedIn(true);
        } catch (error) {
            
        }
    };

    const SignUp = async(username , password)=>{
      try {
        const res = await axios.post("api/auth/signup", { username, password });
      const { encodedToken, foundUser } = res.data;
      localStorage.setItem("token", encodedToken);
      setUser(foundUser);
      setLoggedIn(true);
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <AuthContext.Provider value={{signIn , user , loggedIn , SignUp}}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider