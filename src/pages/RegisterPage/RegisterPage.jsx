import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import LogIn from "../../components/LogIn/LogIn";
import SignUp from "../../components/SignUp/SignUp";

function RegisterPage() {
  const navigate = useNavigate();

  const handleLogin = async (user) => {
    try {
      const response = await axios.post("https:/login", user);
      const { token } = response.data;

      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      alert(
        "Login failed: " + (error.response?.data?.message || error.message)
      );
    }
  };

  const handleSignUp = async (user) => {
    try {
      const response = await axios.post("https:/register", user);

      if (response && response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
        navigate("/");
      } else {
        alert("Registration successful!");
        navigate("/login");
      }
    } catch (error) {
      alert(
        "Registration failed: " +
          (error.response?.data?.message || error.message)
      );
    }
  };

  return (
    <div className="register-wrap">
      <LogIn onLogin={handleLogin} />
      <SignUp onSignUp={handleSignUp} />
    </div>
  );
}
export default RegisterPage;
