import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { constants } from "../../app-utils";
import { Password } from "../../components";
import { useAuth } from "../../contexts";
import { useDocumentTitle } from "../../custom-hooks";
import "./Signup.css";

const Signup = () => {
  const { signUpUser } = useAuth();
  const navigate = useNavigate();

  type CredentialType = {
    email: string;
    password: string;
    confirmPassword: string;
    firstName: string;
    lastName: string;
    agreed: boolean;
  };
  const initialCredentialState: CredentialType = {
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    agreed: false,
  };
  const [credentials, setCredentials] = useState(initialCredentialState);

  const { titles } = constants;
  useDocumentTitle(titles.signup());

  const submitUser = async (
    e: React.FormEvent<HTMLFormElement>,
    details: CredentialType
  ) => {
    e.preventDefault();
    if (details.password !== details.confirmPassword) {
      toast.error(
        "Password Doesn't Match. Enter same password in both fields."
      );
      return;
    }
    if (!details.agreed) {
      toast.error("Please agree to the Terms & Conditions");
      return;
    }
    await signUpUser(details);
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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
          <label htmlFor="firstName" className="required-title">
            First Name
          </label>
          <input
            type="text"
            value={credentials.firstName}
            className="input-box"
            id="firstName"
            name="firstName"
            onChange={handleChange}
            placeholder="John"
            required
            autoFocus
          />
        </div>
        <div className="required-text">
          <label htmlFor="lastName" className="required-title">
            Last Name
          </label>
          <input
            type="text"
            className="input-box"
            id="lastName"
            onChange={handleChange}
            value={credentials.lastName}
            name="lastName"
            placeholder="Doe"
            required
          />
        </div>
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
          />
        </div>
        <div className="required-text">
          <label htmlFor="password" className="required-title">
            Create a Password
          </label>
          <Password
            title="Password must contain atleast 8 characters, 1 UpperCase, 1 LowerCase and a Special Character."
            pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*_=+-]).{8,16}$"
            placeholder="Type your password here..."
            fieldValue={credentials.password}
            fieldName={"password"}
            onChange={handleChange}
          />
        </div>
        <div className="required-text">
          <label htmlFor="confirmPassword" className="required-title">
            Confirm Password
          </label>
          <Password
            placeholder="Type your password here again..."
            fieldValue={credentials.confirmPassword}
            fieldName={"confirmPassword"}
            onChange={handleChange}
          />
        </div>
        <div className="checkbox">
          <input
            checked={credentials.agreed}
            type={"checkbox"}
            id="terms"
            onChange={(e) =>
              setCredentials((details) => {
                return { ...details, agreed: e.target.checked };
              })
            }
          />
          <label htmlFor="terms">I agree to all Terms &amp; Conditions</label>
        </div>
        <button className="btn btn-secondary submit-btn" type="submit">
          Submit
        </button>
        <div className="password-mgmt">
          <p className="text-section">
            <span>Existing User?</span>
            <Link to={"/login"} className="link">
              Login
            </Link>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Signup;
