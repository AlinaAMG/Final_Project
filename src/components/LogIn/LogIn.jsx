import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../pages/RegisterPage/RegisterPage.css";
import "./LogIn.css";

function LogIn({ onLogin }) {
  const [user, setUser] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(user);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prev) => ({ ...prev, [name]: value }));
  };
  return (
    <div>
      <h2 className="register-title">LogIn</h2>
      <h3 className="register-sub-title">Welcome back</h3>
      <form onSubmit={handleSubmit} className="register-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="register-input"
          value={user.email}
          onChange={handleChange}
          required
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="register-input"
          value={user.password}
          onChange={handleChange}
          required
        />
        <Link to="/" className="forgot-link">
          Forgot password?{" "}
        </Link>
        <button type="submit" className="btn">
          LogIn
        </button>
      </form>
    </div>
  );
}

export default LogIn;
