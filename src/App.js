import "./App.css";
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
    <section className="w-full h-full bg-gray-800 flex flex-col items-center">
      <div className="text-2xl">{data.message}</div>
      <LoginForm />
    </section>
  );
}

export default App;
