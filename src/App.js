import logo from "./logo.svg";
import "./App.css";
import React, { useEffect, useState } from "react";
import LoginForm from "./component/login/loginForm.jsx";

function App() {
  const [data, setData] = useState([]);
  useEffect(() => {
    fetch("/.netlify/functions/api").then((res) => {
      res.text().then((data) => {
        setData(data);
      });
    });
    console.log(data);
  }, []);

  return (
    <section className="w-full h-full bg-gray-800 flex flex-col items-center">
      <div>{data}</div>
      <LoginForm />
    </section>
  );
}

export default App;
