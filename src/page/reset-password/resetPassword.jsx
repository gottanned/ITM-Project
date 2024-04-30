import { useState } from "react";
import { Toaster, toast } from "react-hot-toast";
import "./resetPassword.css";

const ResetPassword = () => {
  const [stage, setStage] = useState(0); // 0: email, 1: otp, 2: password
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const sendOTP = async (e) => {
    e.preventDefault();
    const response = await fetch("/.netlify/functions/api/auth/sendOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email }),
    });
    const data = await response.json();
    if (data.message === "OTP sent successfully!") {
      toast.success(data.message);
      const emailInput = document.getElementById("email-input");
      emailInput.value = "";

      setStage(1);
    } else {
      toast.error(data.message);
    }
  };

  const verifyOTP = async (e) => {
    e.preventDefault();
    const response = await fetch("/.netlify/functions/api/auth/verifyOTP", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, otp: otp }),
    });
    const data = await response.json();
    if (data.message === "OTP verified successfully!") {
      toast.success(data.message);
      setStage(2);
    } else {
      toast.error(data.message);
    }
  };

  const resetPassword = async (e) => {
    e.preventDefault();
    const response = await fetch("/.netlify/functions/api/auth/resetPassword", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        otp: otp,
        password: password,
        confirmPassword: confirmPassword,
      }),
    });
    const data = await response.json();
    if (data.message === "Password reset successfully!") {
      toast.success(data.message);
      window.location.href = "/";
    } else {
      toast.error(data.message);
    }
  };
  /*
  return (
    <div className="w-full h-full background-radial-gradient-reset-password flex flex-col ">
      <div className="container vh-100 d-flex justify-content-center align-items-center">
        <div className="row">
          <div className="col-md-6">
            <div className="card bg-glass" style={{ minWidth: "400px" }}>
              <Toaster />
              <div className="card-body py-md-5 px-md-5">
                <form id="resetPasswordForm">
                  {(() => {
                    if (stage === 0) {
                      return (
                        <div>
                          <div className="form-outline mb-4">
                            <label
                              className="display-5 fw-bold"
                              for="resetPasswordForm"
                            >
                              Reset Password
                            </label>
                            <p>Please enter your email to continue</p>
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

                          <div
                            className="form-outline mb-4"
                            id="alertMessege"
                          />

                          <div className="d-flex justify-content-between align-items-center mb-4">
                            <div>
                              Already a member? <a href="/">Sign In</a>
                            </div>
                          </div>

                          <button
                            type="submit"
                            className="btn btn-success bg-transparent text-dark btn-block mb-4"
                            style={{ width: "100%" }}
                            onClick={sendOTP}
                          >
                            Next
                          </button>
                        </div>
                      );
                    }
                  })()}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
  */
  return (
    <div className="w-full h-full background-radial-gradient-reset-password flex flex-col ">
      <div className="row px-md-5 py-5 justify-content-center align-items-center">
        <div className="col-md-6">
          <div
            className="card bg-glass mx-auto"
            style={{ maxWidth: "400px", width: "100%" }}
          >
            <Toaster />
            <div className="card-body py-md-5 px-md-5">
              <form id="resetPasswordForm">
                {(() => {
                  if (stage === 0) {
                    return (
                      <div>
                        <div className="form-outline mb-4">
                          <label
                            className="display-5 fw-bold"
                            for="resetPasswordForm"
                          >
                            Reset Password
                          </label>
                          <p>Please enter your email to continue</p>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="email"
                            id="email-input"
                            className="form-control"
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          <label className="form-label" for="form3Example3">
                            Email address
                          </label>
                        </div>
                        <div className="d-flex justify-content-between align-items-center mb-4">
                          <div>
                            Already a member? <a href="/">Sign In</a>
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-success bg-transparent text-dark btn-block mb-4"
                          style={{ width: "100%" }}
                          onClick={sendOTP}
                        >
                          Next
                        </button>
                      </div>
                    );
                  } else if (stage === 1) {
                    return (
                      <div>
                        <div className="form-outline mb-4">
                          <label
                            className="display-5 fw-bold"
                            for="resetPasswordForm"
                          >
                            Reset Password
                          </label>
                          <p>Please enter the OTP sent to your email</p>
                        </div>
                        <div className="form-outline mb-4">
                          <input
                            type="text"
                            id="otp-input"
                            className="form-control"
                            onChange={(e) => setOtp(e.target.value)}
                            placeholder=""
                          />
                          <label className="form-label" for="form3Example3">
                            OTP
                          </label>
                        </div>
                        <button
                          type="submit"
                          className="btn btn-success bg-transparent text-dark btn-block mb-4"
                          style={{ width: "100%" }}
                          onClick={verifyOTP}
                        >
                          Verify OTP
                        </button>
                      </div>
                    );
                  } else if (stage === 2) {
                    return (
                      <div>
                        <div className="form-outline mb-4">
                          <label
                            className="display-5 fw-bold"
                            for="resetPasswordForm"
                          >
                            Reset Password
                          </label>
                          <p>Please enter your new password</p>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="password-input"
                            className="form-control"
                            onChange={(e) => setPassword(e.target.value)}
                          />
                          <label className="form-label" for="form3Example3">
                            Password
                          </label>
                        </div>

                        <div className="form-outline mb-4">
                          <input
                            type="password"
                            id="confirm-password-input"
                            className="form-control"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                          />
                          <label className="form-label" for="form3Example3">
                            Confirm Password
                          </label>

                          <button
                            type="submit"
                            className="btn btn-success bg-transparent text-dark btn-block mb-4"
                            style={{ width: "100%" }}
                            onClick={resetPassword}
                          >
                            Set New Password
                          </button>
                        </div>
                      </div>
                    );
                  }
                })()}
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
