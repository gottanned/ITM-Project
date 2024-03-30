import "./index.css";
import React, { useEffect, useState } from "react";
import LoginForm from "./component/login/loginForm.jsx";

function App() {
  const [data, setData] = useState("");
  useEffect(() => {
    fetch("/.netlify/functions/api/")
      .then((response) => response.text())
      .then((data) => setData(data));
  }, []);
  return (
    <div className="w-full h-full bg-gray-800 background-radial-gradient flex flex-col items-center">
      <LoginForm />
    </div>
  );
}

export default App;
