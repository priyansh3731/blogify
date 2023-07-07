import axios from 'axios'
import React, { createContext, useEffect, useState } from 'react'

export const DataContext = createContext()

const DataContextProvider = ({children}) => {
  const [postsData,setPostsData]=useState([])

  const fetchData = async() => {
    try{
      const {data: {posts}} = await  axios.get("api/posts")
      setPostsData(posts)
    }
    catch(e){console.log(e)}
  }
  useEffect(()=>{
    fetchData()
  },[])
  return (
    <DataContext.Provider value={{postsData ,setPostsData}}>{children}</DataContext.Provider>
  )
}

export default DataContextProvider