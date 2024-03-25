import "../../App.css";
import React, { useEffect, useState } from "react";
import SignupForm from "../../component/signup/signupForm.jsx";

function SignUp() {
  return (
    <section className="w-full h-full bg-gray-800 flex flex-col items-center">
      <SignupForm />
    </section>
  );
}

export default SignUp;
