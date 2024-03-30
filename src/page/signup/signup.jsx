import React, { useEffect, useState } from "react";
import SignupForm from "../../component/signup/signupForm.jsx";
require("./signup.css");

function SignUp() {
  return (
    <div className="w-full h-full bg-gray-800 background-radial-gradient-signup flex flex-col items-center">
      <SignupForm />
    </div>
  );
}

export default SignUp;
