import React from "react";
import { useNavigate } from "react-router-dom";

const DashBoard = () => {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate("/products");
  };

  return (
    <div
      style={{
        height: "100vh", // Full viewport height
        margin: "0",
        padding: "0",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #ff7eb3, #ff758c, #ff4e72)",
        color: "white",
        fontFamily: "'Poppins', sans-serif",
        textAlign: "center",
      }}
    >
      <h1
        style={{
          fontSize: "4rem",
          fontWeight: "bold",
          textShadow: "2px 4px 8px rgba(0, 0, 0, 0.2)",
          marginBottom: "1rem",
        }}
      >
        🌟 Product Dashboard 🌟
      </h1>
      <p
        style={{
          fontSize: "1.5rem",
          fontWeight: "300",
          marginBottom: "3rem",
          lineHeight: "1.8",
          maxWidth: "600px",
        }}
      >
        Discover and manage your products seamlessly. Let’s explore the magic of
        your marketplace!
      </p>
      <button
        onClick={handleButtonClick}
        style={{
          backgroundColor: "#ffffff",
          color: "#ff4e72",
          fontSize: "1.2rem",
          padding: "0.8rem 2rem",
          border: "none",
          borderRadius: "50px",
          cursor: "pointer",
          transition: "all 0.3s ease-in-out",
          fontWeight: "bold",
          boxShadow: "0 4px 15px rgba(255, 78, 114, 0.5)",
        }}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "#ff4e72";
          e.target.style.color = "#ffffff";
          e.target.style.boxShadow = "0 6px 20px rgba(255, 78, 114, 0.7)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "#ffffff";
          e.target.style.color = "#ff4e72";
          e.target.style.boxShadow = "0 4px 15px rgba(255, 78, 114, 0.5)";
        }}
      >
        🚀 Go to Product List 🚀
      </button>
    </div>
  );
};

export default DashBoard;
