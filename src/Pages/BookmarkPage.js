import React, { useContext , useEffect, useState} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import "./Explore.css"
import axios from 'axios';
import { BookmarkContext } from '../context/BookmarkContextProvider';
import { AuthContext } from '../context/AuthContext';



export function BookmarkPage(){
    const {bookmarkPost} = useContext(BookmarkContext)
    const [bookmarkbutton , setbookmarkbutton] = useState([])
    const {loggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    if(loggedIn === false){
      navigate("/signin")
    }

    const showbookmark=async()=>{
      try {
        var res
        for (let i = 0; i < bookmarkPost.length; i++) {
          res = await axios.get(`/api/posts/${bookmarkPost[i]}`)
          console.log(res)
          setbookmarkbutton([...bookmarkbutton,res.data.post]);
        }
      } catch (error) {
        console.log(error)
      }
    }

  
      const bookmarkPostHandler=async(id)=>{
        try {
          console.log(id)
            const res = await axios.post(`api/users/remove-bookmark/${id}/`,{},{headers:{authorization:localStorage.getItem("token")}})
            console.log(res)
        } catch (error) {
          console.log(error)
        }
      }

      useEffect(()=>{showbookmark()},[])
return(
    <div>
      <header>
      <Link style={{textDecoration:'none'}} to={"/"}><h1>blogify</h1></Link>
      </header>
    <ul>
        {
            bookmarkbutton.map(({_id,content,username,createAt})=>
                <li key={_id}>
                 <div className='profile'>
                  <span className='name'><Link to={`/posts/user/${username}`}>{username}</Link>{createAt}</span>
                  </div>
                 
                  <Link className='singlepost' to={`/posts/${_id}`}>{content}</Link>
                  <br></br>
                  <button className='like' onClick={() => bookmarkPostHandler(_id)}>bookmark</button>
                  </li>
            )
        }
    </ul>
    <footer>
        <Link to={"/"} className='manu'>Explore</Link>
        <Link to={"/createpost"} className='manu'>post</Link>
        <Link className='manu'>bookmark</Link>
        <Link to={"/profile"} className='manu'>profile</Link>
    </footer>
    </div>
)
}