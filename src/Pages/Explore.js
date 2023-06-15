import React, { useContext } from 'react'
import { DataContext } from '../context/DataContextProvider';
import "./Explore.css"

const Explore = () => {
    const {postsData} = useContext(DataContext);

    const Header=()=>{
      return (
        <div>
          <Header className='logo'>
         <h1>Blogify</h1>
        </Header>
        <ul>
          {
            postsData.map(({id,content})=>
              <li key={id}>{content}</li>
            )
          }
        </ul>
        </div>
      )
    }
  return (
   <div>
    <Header />
   </div>
  )
}

export default Explore