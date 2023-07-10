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

    const SignUp = async(username , password , bio)=>{
      try {
        const res = await axios.post("api/auth/signup", { username, password ,bio});
        console.log(res)
      const { encodedToken, createdUser} = res.data;
      localStorage.setItem("token", encodedToken);
      setUser(createdUser);
      setLoggedIn(true);
      } catch (error) {
        console.log(error)
      }
    }

  return (
    <AuthContext.Provider value={{signIn , user ,setUser, loggedIn , SignUp}}>{children}</AuthContext.Provider>
  )
}

export default AuthContextProvider