import axios from 'axios'
import React from 'react'
import { useContext } from 'react';
import { DataContext } from '../context/DataContextProvider';
import { Link, useNavigate } from 'react-router-dom';

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
    <div>
      <header>
      <Link style={{textDecoration:'none'}} to={"/"}><h1>blogify</h1></Link>
      </header>
    <form onSubmit={submitHandler}>
        <input placeholder='write somthing'  type='text'></input>
        <button className='postbutton' type='submit'>post</button>
    </form>
    <footer>
    <Link to={"/"} className='manu'>Explore</Link>
        <Link className='manu'>post</Link>
        <Link to={"/users/bookmark"} className='manu'>bookmark</Link>
        <Link className='manu'>profile</Link>
    </footer>
    </div>
  )
}

export default Createpost