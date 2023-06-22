import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { DataContext } from '../context/DataContextProvider'
import "./Explore.css"
import { AuthContext } from '../context/AuthContext';

function Explore() {
    const {postsData} = useContext(DataContext);
    const {loggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    if(loggedIn === false){
      navigate("/signin")
    }
  return (
    <div>
      <header>
        <h1>blogify</h1>
      </header>
    <ul>
        {
            postsData.map(({_id,content,username,createAt})=>
                <li key={_id}>
                 <Link className='singlepost' to={`/posts/${_id}`}>
                 <div className='profile'>
                  <span className='name'>{username}{createAt}</span>
                  <button className='follow'>follow</button>
                  </div>
                  {content}
                  <br></br>
                  <button className='like'>like</button>
                  <button className='like'>comment</button>
                  <button className='like'>unlike</button>
                 </Link>
                  </li>
            )
        }
    </ul>
    <footer>
        <Link className='manu'>Explore</Link>
        <Link className='manu'>treding</Link>
        <Link className='manu'>post</Link>
        <Link className='manu'>like</Link>
        <Link className='manu'>bookmark</Link>
        <Link className='manu'>profile</Link>
    </footer>
    </div>
  )
}

export default Explore