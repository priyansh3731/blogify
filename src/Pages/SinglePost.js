import axios from 'axios'
import React, { useEffect, useState ,useContext} from 'react'
import { useParams , Link } from 'react-router-dom';
import { BookmarkContext } from '../context/BookmarkContextProvider';

import "./Explore.css";

export const SinglePost = () => {
  const {postId} = useParams();
  const [SinglepostsData,setSinglePostsData]=useState();
  const {setBookmarkpost} = useContext(BookmarkContext)

  const fetchData = async() => {
    try{
      const {data : {post}}= await axios.get(`/api/posts/${postId}`)
      setSinglePostsData(post)
    }
    catch(e){console.log(e)}
  }


  const onclickHandler1=async(event,_id)=>{
    try {
    
      const res = await axios.post(`api/posts/like/${_id}`,{},{headers:{authorization:localStorage.getItem("token")}})
      setSinglePostsData(res.data.posts)
     
    } catch (error) {
      console.log(error)
    }
  }

  const onclickHandler2=async(event,_id)=>{
    try {
      const res = await axios.post(`api/posts/dislike/${_id}`,{},{headers:{authorization:localStorage.getItem("token")}})
      setSinglePostsData(res.data.posts)
    } catch (error) {
      console.log(error)
    }
  }

  const bookmarkPostHandler = async(event,id)=>{
    try {
        const res = await axios.post(`api/users/bookmark/${id}/`,{},{headers:{authorization:localStorage.getItem("token")}})
      setBookmarkpost(res.data.bookmarks)
      
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(()=>{
    fetchData()
  },[])

  
  return (
    <div>
      <header>
      <Link style={{textDecoration:'none'}} to={"/"}><h1>blogify</h1></Link>
      </header>
    <div key={SinglepostsData?._id} className='singlediv'><div className='profile'>
    <span className='name'>{SinglepostsData?.username}{SinglepostsData?.createAt}</span>
    </div>
    {SinglepostsData?.content}
    <br></br>
    <button className='like' onClick={(event)=>onclickHandler1(event,SinglepostsData?._id)}>{SinglepostsData?.likes.likeCount}</button>
                  <button className='like' onClick={(event)=>bookmarkPostHandler(event,SinglepostsData?._id)}>bookmark</button>
                  <button className='like' onClick={(event)=>onclickHandler2(event,SinglepostsData?._id)}>dislike</button>
    <footer>
        <Link to={"/"} className='manu'>Explore</Link>
        <Link className='manu'>post</Link>
        <Link className='manu'>bookmark</Link>
        <Link className='manu'>profile</Link>
    </footer>
    </div>
    </div>
  )
}