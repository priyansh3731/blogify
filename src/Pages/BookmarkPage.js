import React, { useContext} from 'react'
import { Link, useNavigate} from 'react-router-dom'
import "./Explore.css"
import axios from 'axios';
import { BookmarkContext } from '../context/BookmarkContextProvider';
import { AuthContext } from '../context/AuthContext';



export function BookmarkPage(){
    const {bookmarkPost} = useContext(BookmarkContext)
    const {setBookmarkpost} = useContext(BookmarkContext)
    const {bookmarkbutton , setbookmarkbutton} = useContext(BookmarkContext)
    const {loggedIn} = useContext(AuthContext);
    const navigate = useNavigate();

    if(loggedIn === false){
      navigate("/signin")
    }

  
      const bookmarkPostHandler = async (event,id)=>{
        try {
            const res = await axios.post(`api/users/remove-bookmark/${id}/`,{},{headers:{authorization:localStorage.getItem("token")}})
            console.log(res)
        } catch (error) {
          console.log(error)
        }
      }
return(
    <div>
      <header>
        <h1>blogify</h1>
      </header>
    <ul>
        {
            bookmarkPost.map(({_id,content,username,createAt,likes})=>
                <li key={_id}>
                 <div className='profile'>
                  <span className='name'><Link to={`/posts/user/${username}`}>{username}</Link>{createAt}</span>
                  </div>
                 
                  <Link className='singlepost' to={`/posts/${_id}`}>{content}</Link>
                  <br></br>
                  <button className='like' onClick={(event)=>{bookmarkPostHandler(event,_id)}}>bookmark</button>
                  </li>
            )
        }
    </ul>
    <footer>
        <Link to={"/"} className='manu'>Explore</Link>
        <Link to={"/createpost"} className='manu'>post</Link>
        <Link className='manu'>bookmark</Link>
        <Link className='manu'>profile</Link>
    </footer>
    </div>
)
}