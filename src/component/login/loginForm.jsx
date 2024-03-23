import React, { useState } from "react";
const cookies = require("js-cookie");
require("./loginForm.css");

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/.netlify/functions/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username, password: password }),
    });
    const data = await response.json();
    console.log(data);
    if (data.accessToken) {
      cookies.set("accessToken", data.accessToken);
      console.log(cookies.get("accessToken"));
      window.location.href = "/temp";
    }
  };

  return (
    <section
      className="background-radial-gradient overflow-hidden"
      style={{ height: "100vh" }}
    >
      <div className="container px-5 py-5 px-md-5 text-center text-lg-start my-5">
        <div className="row gx-lg-5 align-items-center mb-5">
          <div className="col-lg-6 mb-5 mb-lg-0" style={{ zIndex: 10 }}>
            <h1
              className="my-5 display-5 fw-bold ls-tight"
              style={{ color: "hsl(218, 81%, 95%)" }}
            >
              Start selling Giftcards <br />
              <span style={{ color: "hsl(218, 81%, 75%)" }}>
                for your business
              </span>
            </h1>
            <p
              className="mb-4 opacity-70"
              style={{ color: "hsl(218, 81%, 85%)" }}
            >
              You are invited to join our platform to start selling giftcards.
              This is the beta version of our platform. We are looking for
              feedback to improve our platform. Rest assured, we will not charge
              you for using our platform and your data will always be safe with
              us.
            </p>
          </div>

          <div className="col-lg-6 mb-5 mb-lg-0 position-relative">
            <div
              id="radius-shape-1"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2"
              className="position-absolute shadow-5-strong"
            ></div>

            <div className="card bg-glass">
              <div className="card-body px-4 py-5 px-md-5">
                <form onSubmit={handleOnSubmit}>
                  <div className="form-outline mb-4">
                    <input
                      type="username"
                      id="username"
                      className="form-control"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="form-label" for="username">
                      Username
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" for="password">
                      Password
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary btn-block mb-4"
                    style={{ width: "100%" }}
                    handleOnSubmit={handleOnSubmit}
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
