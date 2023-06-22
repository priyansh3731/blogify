import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function SignUp() {
    const {SignUp , loggedIn} = useContext(AuthContext)
    const navigate = useNavigate();

    if(loggedIn === true){
        navigate("/")
    }
    const SignUpHandler =async(event)=>{
        try {
            event.preventDefault();
            const username = event.target[0].value;
            const password = event.target[1].value;

            await SignUp(username,password)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <div>
        <form onSubmit={SignUpHandler}>
            <h2>sign up</h2>
            <label>
                username
                <input type='text' required></input>
            </label>
            <label>
                password
                <input type='password' required></input>
            </label>
           <button type="submit">Sign up</button> 
        </form>
    </div>
  )
}

export default SignUp