import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
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
      cookies.set("username", data.username);
      toast.success("User was logged in successfully!");
      window.location.href = "/dashboard";
    } else {
      toast.error(data.message);
    }
  };

  return (
    <section className="w-full h-full">
      <div className=" px-4 py-5 px-md-5 text-center text-lg-start my-5">
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
              <Toaster />
              <div className="card-body px-4 py-5 px-md-5">
                <form id="loginForm" onSubmit={handleOnSubmit}>
                  <div className="form-outline mb-4">
                    <label className="display-5 fw-bold" for="loginForm">
                      Sign In
                    </label>
                  </div>
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

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      Not a member? <a href="/signup">Sign up</a>
                    </div>
                    <div>
                      <a href="/reset-password">Forgot password?</a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary bg-transparent text-dark btn-block mb-4"
                    style={{ width: "100%" }}
                    handleOnSubmit={handleOnSubmit}
                  >
                    Sign In
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
