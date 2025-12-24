import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AnalyzePage from "./pages/AnalyzePage";
import MockInterviewPage from "./pages/MockInterviewPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AnalyzePage />} />
        <Route path="/mock-interview" element={<MockInterviewPage />} />
      </Routes>
    </Router>
  );
}

export default App;
