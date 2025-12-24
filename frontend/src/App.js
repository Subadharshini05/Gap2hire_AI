import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";
import MockInterviewPage from "./pages/MockInterviewPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/analyze" element={<AnalyzePage />} />
        <Route path="/mock-interview" element={<MockInterviewPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
