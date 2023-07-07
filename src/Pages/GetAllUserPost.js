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
        <h1>blogify</h1>
      </header>
      <h2>{user?.username}</h2>
      <p>{user?.bio}</p>
    <ul>
        {
            userpost.map(({_id,content,username,createAt})=>
                <li key={_id}>
                 <div className='profile'>
                  <span className='name'><Link to={`/posts/user/${username}`}>{username}</Link>{createAt}</span>
                  <button className='follow'>follow</button>
                  </div>
                  <Link className='singlepost' to={`/posts/${_id}`}>{content}</Link>
                  <br></br>
                  <button className='like'>like</button>
                  <button className='like'>bookmark</button>
                  <button className='like'>unlike</button>
                  </li>
            )
        }
    </ul>
    <Link to={"/createpost"}><button className='create'>create</button></Link>
    <footer>
        <Link to={"/"} className='manu'>Explore</Link>
        <Link className='manu'>post</Link>
        <Link className='manu'>bookmark</Link>
        <Link className='manu'>profile</Link>
        <p>hello</p>
    </footer>
    </div>
  )
}

export default GetAllUserPost