// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Explore from './Pages/Explore';
import { SinglePost } from './Pages/SinglePost';
import SignInSignUp from './Pages/SignInSignUp';
import SignUp from './Pages/SignUp';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Explore />}></Route>
        <Route path='/posts/:postId' element={<SinglePost />}></Route>
        <Route path='/signin' element={<SignInSignUp />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
      </Routes>
    </div>
  );
}

export default App;
