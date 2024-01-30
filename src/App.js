import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import PostPage from "./pages/PostPage";

function App() {
  document.body.style = "background: #233142;";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="*" element={<PostPage />} />
      </Routes>
    </Router>
  );
}

export default App;
