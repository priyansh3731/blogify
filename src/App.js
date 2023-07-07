// import logo from './logo.svg';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import Explore from './Pages/Explore';
import { SinglePost } from './Pages/SinglePost';
import SignInSignUp from './Pages/SignInSignUp';
import SignUp from './Pages/SignUp';
import GetAllUserPost from './Pages/GetAllUserPost';
import Createpost from './Pages/Createpost';
import {BookmarkPage} from "./Pages/BookmarkPage"


function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Explore />}></Route>
        <Route path='/posts/:postId' element={<SinglePost />}></Route>
        <Route path='/signin' element={<SignInSignUp />}></Route>
        <Route path='/signup' element={<SignUp />}></Route>
        <Route path='/posts/user/:username' element={<GetAllUserPost />}></Route>
        <Route path='/createpost' element={<Createpost />}></Route>
        <Route path='/users/bookmark' element={<BookmarkPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
