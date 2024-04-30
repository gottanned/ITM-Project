import React, { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
require("./signupForm.css");

const SignupForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/.netlify/functions/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    });
    const data = await response.json();
    console.log(data);
    if (response.status === 200) {
      toast.success(data.message);
      window.location.href = "/";
    } else {
      toast.error(data.message);
    }
  };

  return (
    <section>
      <div className="px-4 py-5 px-md-5 text-center text-lg-start my-5">
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
              id="radius-shape-1-signup"
              className="position-absolute rounded-circle shadow-5-strong"
            ></div>
            <div
              id="radius-shape-2-signup"
              className="position-absolute shadow-5-strong"
            ></div>

            <div className="card bg-glass">
              <Toaster />
              <div className="card-body px-4 py-5 px-md-5">
                <form id="signupForm" onSubmit={handleOnSubmit}>
                  <div className="form-outline mb-4">
                    <label className="display-5 fw-bold" for="signupForm">
                      Sign Up
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
                      type="email"
                      id="form3Example3"
                      className="form-control"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" for="form3Example3">
                      Email address
                    </label>
                  </div>

                  <div className="form-outline mb-4">
                    <input
                      type="password"
                      id="form3Example4"
                      className="form-control"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" for="form3Example4">
                      Password
                    </label>
                  </div>
                  <div className="form-outline mb-4" id="alertMessege" />

                  <div className="d-flex justify-content-between align-items-center mb-4">
                    <div>
                      Already a member? <a href="/">Sign In</a>
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-success bg-transparent text-dark btn-block mb-4"
                    style={{ width: "100%" }}
                  >
                    Sign Up
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

export default SignupForm;
