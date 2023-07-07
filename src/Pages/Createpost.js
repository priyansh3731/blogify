import axios from 'axios'
import React from 'react'
import { useContext } from 'react';
import { DataContext } from '../context/DataContextProvider';
import { useNavigate } from 'react-router-dom';

function Createpost() {
    const navigate = useNavigate();
    const {setPostsData} = useContext(DataContext)

    const submitHandler = async(event)=>{
        event.preventDefault();
        const res = await axios.post("api/posts",{postData:{content : event.target[0].value}},{headers:{authorization:localStorage.getItem("token")}});
        setPostsData(res.data.posts)
        navigate('/')
    }
  return (
    <form onSubmit={submitHandler}>
        <input type='text'></input>
        <button type='submit'>post</button>
    </form>
  )
}

export default Createpost