import React, { useState } from "react";
import "./SignUp.css";
import "../../pages/RegisterPage/RegisterPage.css";

function SignUp({ onSignUp }) {
  const [user, setUser] = useState({
    userName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();

    onSignUp(user);

    alert("signUp success!");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div>
      <h2 className="register-title">SignUp</h2>
      <h3 className="register-sub-title">Register for a new account</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="text"
          name="userName"
          placeholder="User name"
          className="register-input"
          value={user.userName}
          required
          onChange={handleChange}
        />

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="register-input"
          value={user.email}
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="register-input"
          value={user.password}
          required
          onChange={handleChange}
        />

        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          className="register-input"
          value={user.confirmPassword}
          required
          onChange={handleChange}
        />
        <button type="submit" className="btn">
          SignUp
        </button>
      </form>
    </div>
  );
}
export default SignUp;
