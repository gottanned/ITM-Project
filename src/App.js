import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import LoginForm from "./component/login/loginForm.jsx";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("http://localhost:8080/")
      .then((res) => res.json())
      .then((data) => {
        setData(data.message);
      });
  }, []);

  return (
    <section className="w-full h-full bg-gray-800 flex flex-col items-center">
      <LoginForm />
    </section>
  );
}

export default App;
