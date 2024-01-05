import "./App.css";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";

function App() {
  document.body.style = "background: #233142;";
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        {/* <Route path="*" element={<Header />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
