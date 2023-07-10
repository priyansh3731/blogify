import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../context/AuthContext'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Popup from 'reactjs-popup'
import { BookmarkContext } from '../context/BookmarkContextProvider';

function Profile() {
    const {user,setUser} = useContext(AuthContext)
    const [userPost , setUserpost] = useState([])
    const {setBookmarkpost} = useContext(BookmarkContext)


    const userProfile=async()=>{
        try {
            const res = await axios.get(`/api/posts/user/${user.username}`)
            setUserpost(res.data.posts)
        } catch (error) {
            console.log(error)
        }
    }

    const profileSubmit=async(e)=>{
        try {
            e.preventDefault();
            const res = await axios.post("api/users/edit",{userData:{bio : e.target[0].value}},{headers:{authorization:localStorage.getItem("token")}});
            console.log(res)
            setUser(res.data.user)
        } catch (error) {
            
        }
    }

    const onclickHandler1=async(event,_id)=>{
        try {
        
          const res = await axios.post(`api/posts/like/${_id}`,{},{headers:{authorization:localStorage.getItem("token")}})
          setUserpost(res.data.posts)
         
        } catch (error) {
          console.log(error)
        }
      }
  
      const onclickHandler2=async(event,_id)=>{
        try {
          const res = await axios.post(`api/posts/dislike/${_id}`,{},{headers:{authorization:localStorage.getItem("token")}})
         setUserpost(res.data.posts)
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

    useEffect(()=>{userProfile()},[])
  return (
    <div>
        <header>
        <Link style={{textDecoration:'none'}} to={"/"}><h1>blogify</h1></Link>
      </header>
      <h2>{user?.username}</h2>
      <p>{user?.bio}</p>
      <Popup trigger={ <button className='like'>edit</button>}> <form onSubmit={profileSubmit}>
        <input placeholder='write somthing'  type='text'></input>
        <button className='postbutton' type='submit'>post</button>
    </form></Popup>
    <ul>
        {
            userPost.map(({_id,content,username,createAt,likes})=>
                <li key={_id}>
                 <div className='profile'>
                  <span className='name'><div className='circle'></div><Link  className='username' to={`/posts/user/${username}`}>{username}</Link>{createAt}</span>
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
    <footer>
        <Link to={"/"} className='manu'>Explore</Link>
        <Link to={"/createpost"} className='manu'>post</Link>
        <Link to={"/users/bookmark"} className='manu'>bookmark</Link>
        <Link className='manu'>profile</Link>
    </footer>
    </div>
  )
}

export default Profile