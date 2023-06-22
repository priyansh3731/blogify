import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams , Link } from 'react-router-dom';
import "./Explore.css";

export const SinglePost = () => {
  const {postId} = useParams();
  const [SinglepostsData,setSinglePostsData]=useState();

  const fetchData = async() => {
    try{
      const {data : {post}}= await axios.get(`/api/posts/${postId}`)
      setSinglePostsData(post)
    }
    catch(e){console.log(e)}
  }


  useEffect(()=>{
    fetchData()
  },[])

  
  return (
    <div key={SinglepostsData?._id} className='singlediv'><div className='profile'>
    <span className='name'>{SinglepostsData?.username}{SinglepostsData?.createAt}</span>
    <button className='follow'>follow</button>
    </div>
    {SinglepostsData?.content}
    <br></br>
    <button className='like'>like</button>
    <button className='like'>comment</button>
    <button className='like'>unlike</button>
    <footer>
        <Link to={"/"} className='manu'>Explore</Link>
        <Link className='manu'>treding</Link>
        <Link className='manu'>post</Link>
        <Link className='manu'>like</Link>
        <Link className='manu'>bookmark</Link>
        <Link className='manu'>profile</Link>
    </footer>
    </div>
  )
}