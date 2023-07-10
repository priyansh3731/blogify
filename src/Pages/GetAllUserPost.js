import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { Link, useParams } from 'react-router-dom'
import { AuthContext } from '../context/AuthContext';

function GetAllUserPost() {
    const {username} = useParams();
    const [userpost , setUserpost] = useState([]);
    const {user} = useContext(AuthContext)

    const fetchData =async()=>{
        try {
            const res = await axios.get(`/api/posts/user/${username}`)
            setUserpost(res.data.posts)
        } catch (error) {
            console.log(error)
        }
    }


    useEffect(()=>{fetchData()},[])


  return (
    <div>
    <header>
    <Link style={{textDecoration:'none'}} to={"/"}><h1>blogify</h1></Link>
      </header>
      <h2>{userpost?.username}</h2>
      <p>{userpost?.bio}</p>
    <ul>
        {
            userpost.map(({_id,content,username,createAt,likes})=>
                <li key={_id}>
                 <div className='profile'>
                  <span className='name'><div className='circle'></div><Link className='username' to={`/posts/user/${username}`}>{username}</Link>{createAt}</span>
                  </div>
                  <Link className='singlepost' to={`/posts/${_id}`}>{content}</Link>
                  <br></br>
                  <button className='like'>{likes.likeCount}</button>
                  <button className='like'>bookmark</button>
                  <button className='like'>unlike</button>
                  </li>
            )
        }
    </ul>
    <Link to={"/createpost"}><button className='create'>+</button></Link>
    <footer>
    <Link to={"/"} className='manu'>Explore</Link>
        <Link to={"/createpost"} className='manu'>post</Link>
        <Link to={"/users/bookmark"} className='manu'>bookmark</Link>
        <Link className='manu'>profile</Link>
    </footer>
    </div>
  )
}

export default GetAllUserPost