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
    } else {
      toast.error(data.message);
    }
  };

  return (
    <div className="w-full h-full background-radial-gradient-reset-password flex flex-col ">
      <div className="container d-flex justify-content-center align-items-center h-100">
        <div className="card bg-glass" style={{ width: "auto" }}>
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
  );
};

export default ResetPassword;
