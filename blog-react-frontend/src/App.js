import "./App.css";

import Login from "./Components/Login";
import Dashboard from "./Components/Dashboard";
import Home from "./Components/userInterface/Screens/Home";
import Post from "./Components/userInterface/Screens/Post";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import About from "./Components/About";
import Contact from "./Components/Contact";
import FilterBlogs from "./Components/userInterface/Components/FilterBlogs";
import Register from "./Components/Register";

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route element={<Home />} path="/" />
          <Route element={<About />} path="/about" />
          <Route element={<Contact />} path="/contact" />
          <Route element={<FilterBlogs />} path="/Filter/:category" />
          <Route element={<Login />} path="/login" />
          <Route element={<Dashboard />} path="/dashboard/*" />
          <Route element={<Post />} path="/post" />
          <Route element={<Register />} path="/register" />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
