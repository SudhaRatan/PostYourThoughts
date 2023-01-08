import './App.css';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Index from './pages';
import Navbar from './components/navbar/navbar';
import Post from './pages/post';
import YourPosts from './pages/yourPosts';
import Card from './components/card';
import Login from './pages/login';
import Signup from './pages/signup';
import SearchBar from './components/search';

export const API = process.env.REACT_APP_API;

function App() {
  return (
    <div style={st.body}>
      <BrowserRouter >
        <Navbar />
        {/* <SearchBar /> */}
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/post" element={<Post />} />
          <Route path="/yourposts" element={<YourPosts />} />
          <Route path="/card" element={<Card />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>

    </div>

  );
}

export default App;

const st = {
  body: {
    maxHeight: "100vh",
    overflow: "scroll",
    overflowX: "hidden",
  },
}
