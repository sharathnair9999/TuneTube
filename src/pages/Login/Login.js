import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Password } from "../../components";
import { useAuth } from "../../contexts";
import "./Login.css";

const Login = () => {
  const { loginUser, testUser } = useAuth();
  const initialCredentialState = {
    email: "",
    password: "",
  };
  const [credentials, setCredentials] = useState(initialCredentialState);
  const navigate = useNavigate();
  const submitUser = async (e, details) => {
    e.preventDefault();
    await loginUser(details);
    navigate(-1);
  };

  const handleChange = (e) => {
    setCredentials((details) => {
      return { ...details, [e.target.name]: e.target.value };
    });
  };
  return (
    <div className="signup-container flex items-fs ">
      <div className="image-container">
        <img src="/login.png" alt="login" />
      </div>

      <form
        onSubmit={(e) => submitUser(e, credentials)}
        className="form-controls mt-1"
      >
        <div className="required-text">
          <label htmlFor="email" className="required-title" id="email">
            E-mail
          </label>
          <input
            type="email"
            onChange={handleChange}
            className="input-box"
            id="email"
            value={credentials.email}
            name="email"
            placeholder="john.doe@gmail.com"
            required
            autoFocus
          />
        </div>
        <div className="required-text">
          <label htmlFor="password" className="required-title">
            Create a Password
          </label>
          <Password
            placeholder="Type your password here..."
            fieldValue={credentials.password}
            fieldName={"password"}
            onChange={handleChange}
          />
        </div>
        <div className="flex justfy-fs items-center gap-sm">
          <button className="btn btn-secondary submit-btn" type="submit">
            Login
          </button>
          <button
            className="test-btn btn-primary btn flex-and-center gap-sm mb-1"
            onClick={(e) => {
              setCredentials(testUser);
              submitUser(e, testUser);
            }}
          >
            <span>Login as Test User</span>
            <i className="fa-solid fa-arrow-right-to-bracket"></i>
          </button>
        </div>
        <div className="password-mgmt">
          <p className="text-section">
            <span>New User?</span>
            <Link to={"/signup"} className="link">
              Signup
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
