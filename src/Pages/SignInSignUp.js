import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

function SignInSignUp() {

    const navigate = useNavigate();
    const {signIn , loggedIn} = useContext(AuthContext);


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
  return (
    <div>
        <form onSubmit={SignHandler}>
            <h2>sign in</h2>
            <label>
                username
                <input type='text' required></input>
            </label>
            <label>
                password
                <input type='password' required></input>
            </label>
            <button type="submit">Sign in</button>
        </form>
        <h2>signup</h2>
        <Link to="/signup">signup</Link>
    </div>
  )
}

export default SignInSignUp