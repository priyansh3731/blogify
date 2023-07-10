import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "./signup.css";

function SignInSignUp() {

    const navigate = useNavigate();
    const {signIn , SignUp, loggedIn} = useContext(AuthContext);


    if(loggedIn === true){
        navigate("/")
    }

    const SignHandler = async (event)=>{
        event.preventDefault();
        const username = event.target[0].value;
        const password = event.target[1].value;
        try {
            await signIn(username ,password )
        } catch (error) {
            console.log("can't log in ",error)
        }
    }

    const SignUpHandler =async(event)=>{
        try {
            event.preventDefault();
            const username = event.target[0].value;
            const password = event.target[1].value;
            const bio = event.target[2].value;

            await SignUp(username,password,bio)
        } catch (error) {
            console.log(error)
        }
    }
  return (
    <main className='sign'>
        <form onSubmit={SignHandler}>
            <h2>sign in</h2>
            <label>
                <span className='userbox'>username</span>
                <input type='text' required></input>
            </label>
            <label>
                <span>password</span>
                <input type='password' required></input>
            </label>
            <button type="submit" className='like'>Sign in</button>
        </form>
        
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
            <label>
                bio
                <input type='text' required></input>
            </label>
           <button type="submit" className='like'>Sign up</button> 
        </form>
    </main>
  )
}

export default SignInSignUp