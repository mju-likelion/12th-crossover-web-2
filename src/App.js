import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { AuthProvider } from "./Component/AuthContext";
import "./App.css";
import Header from "./Component/Header";
import DeletePostPage from "./Page/DeletePostPage";
import JoinPage from "./Page/JoinPage";
import LoginPage from "./Page/LoginPage";
import MainPage from "./Page/MainPage";
import PostPage from "./Page/PostPage";

function App() {
  const [posts, setPosts] = useState([]);

  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/main"
              element={<MainPage posts={posts} setPosts={setPosts} />}
            />
            <Route path="/post" element={<PostPage setPosts={setPosts} />} />
            <Route
              path="/delete/:postId"
              element={<DeletePostPage posts={posts} setPosts={setPosts} />}
            />
            <Route path="/join" element={<JoinPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
