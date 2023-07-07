import React, { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContextProvider'
import "./Explore.css"
import { AuthContext } from '../context/AuthContext';
import axios from 'axios';
import { BookmarkContext } from '../context/BookmarkContextProvider';
import Popup, { papup } from "reactjs-popup";

function Explore() {
    const {postsData , setPostsData} = useContext(DataContext);
    const {user,setUser,loggedIn} = useContext(AuthContext);
    const navigate = useNavigate();
    const [allusers , setAllusers] = useState([])
    const {setBookmarkpost} = useContext(BookmarkContext)
    const {bookmarkbutton , setbookmarkbutton} = useContext(BookmarkContext)

    if(loggedIn === false){
      navigate("/signin")
    }

    const changeHandler=async(event,_id)=>{
      try {
        if(event.target.value === "delete"){
        const res = await axios.delete(`api/posts/${_id}`,{headers:{authorization:localStorage.getItem("token")}}) 
        setPostsData(res.data.posts)
        }

        if(event.target.value === "edit"){
          console.log(event.target.value)
          const res = await axios.post(`api/posts/edit/${_id}`,{headers:{authorization:localStorage.getItem("token")}}) 
          setPostsData(res.data.posts)
          }
      } catch (error) {
        console.log(error)
      }
    }

    const onclickHandler1=async(event,_id)=>{
      try {
      
        const res = await axios.post(`api/posts/like/${_id}`,{},{headers:{authorization:localStorage.getItem("token")}})
        setPostsData(res.data.posts)
       
      } catch (error) {
        console.log(error)
      }
    }

    const onclickHandler2=async(event,_id)=>{
      try {
        const res = await axios.post(`api/posts/dislike/${_id}`,{},{headers:{authorization:localStorage.getItem("token")}})
       setPostsData(res.data.posts)
      } catch (error) {
        console.log(error)
      }
    }

    const getAllUsers=async()=>{
      try {
        const res = await axios.get("api/users");
        setAllusers(res.data.users)
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

    const followbuttonHandler=async(event,id)=>{
      try {
        const res = await axios.post(`api/users/follow/${id}/`,{},{headers:{authorization:localStorage.getItem("token")}})
        setUser({...user,following: res.data.followUser})
        console.log(user)
        
      } catch (error) {
        console.log(error)
      }
    }

    useEffect(()=>{getAllUsers()},[])

  return (
    <div>
      <header>
        <h1>blogify</h1>
      </header>
      {
        allusers.map(({username,_id})=>{
          return(
            <div>{username}<button onClick={(event)=>{followbuttonHandler(event,_id)}} className='follow'>follow</button></div>
          )
        })
      }
    <ul>
        {
            postsData.map(({_id,content,username,createAt,likes})=>
                <li key={_id}>
                 <div className='profile'>
                  <span className='name'><Link to={`/posts/user/${username}`}>{username}</Link>{createAt}</span>
                  <select onChange={(event)=>changeHandler(event,_id)}>
                    <option></option>
                    <option>delete</option>
                    <Popup trigger={<option>edit</option>}><input></input><button>post</button></Popup>
                  </select>
                  </div>
                 
                  <Link className='singlepost' to={`/posts/${_id}`}>{content}</Link>
                  <br></br>
                  <button className='like' onClick={(event)=>onclickHandler1(event,_id)}>{likes.likeCount}</button>
                  <button className='like' onClick={(event)=>bookmarkPostHandler(event,_id)}>bookmark</button>
                  <button className='like' onClick={(event)=>onclickHandler2(event,_id)}>dislike</button>
                  </li>
            )
        }
    </ul>
    <Link to={"/createpost"}><button className='create'>create</button></Link>
    <footer>
        <Link className='manu'>Explore</Link>
        <Link to={"/createpost"} className='manu'>post</Link>
        <Link to={"/users/bookmark"} className='manu'>bookmark</Link>
        <Link to={`/posts/user/adarshbalika`} className='manu'>profile</Link>
    </footer>
    </div>
  )
}

export default Explore