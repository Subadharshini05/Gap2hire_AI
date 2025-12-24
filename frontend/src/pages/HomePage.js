import React from "react";

const HomePage = () => {
  return (
    <div style={{
      minHeight: "100vh",
      background: "#000",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <div style={{
        background: "#fff",
        padding: "50px",
        maxWidth: "600px",
        textAlign: "center",
        borderRadius: "12px"
      }}>
        <h1>Gap2Hire</h1>
        <p>
          AI-powered Resume Analysis & Mock Interview Platform
        </p>

        <br />

        <a href="/analyze">
          <button style={{ padding: "10px 20px", marginRight: "10px" }}>
            Analyze Resume
          </button>
        </a>

        <a href="/mock-interview">
          <button style={{ padding: "10px 20px" }}>
            Mock Interview
          </button>
        </a>
      </div>
    </div>
  );
};

export default HomePage;
