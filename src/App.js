import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './Components/Home';
import Notes from './Components/Notes';
import Sign from "./Components/Sign"
import Login from "./Components/Login"
import Profile from "./Components/Profile"
import MyClass9 from "./Components/MyClass9"
import Favorit from './Components/Favorit';
import Contect from './Components/Contect';
import Admin from './Components/Admin';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Navbar />}>
            <Route index element={<Home />} />
            <Route path="Notes" element={<Notes />} />
            <Route path="Sign" element={<Sign />} />
            <Route path="Login" element={<Login />} />
            <Route path="Profile" element={<Profile />} />
            <Route path="MyClass9" element={<MyClass9 />} />
            <Route path="Favorit" element={<Favorit />} />
            <Route path="Contect" element={<Contect />} />
            <Route path="Admin" element={<Admin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
