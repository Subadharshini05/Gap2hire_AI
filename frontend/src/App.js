import { useState } from "react";
import HomePage from "./pages/HomePage";
import AnalyzePage from "./pages/AnalyzePage";
import "./App.css";

function App() {
  const [page, setPage] = useState("home");

  return (
    <div className="container">
      {page === "home" && <HomePage goToAnalyze={() => setPage("analyze")} />}
      {page === "analyze" && <AnalyzePage goHome={() => setPage("home")} />}
    </div>
  );
}

export default App;
