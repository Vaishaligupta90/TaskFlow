import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import { useDispatch, useSelector } from "react-redux";
import { postLoginData } from "../redux/actions/authActions";
import Loader from "./utils/Loader";
import { useEffect } from "react";

const LoginForm = ({ redirectUrl }) => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const authState = useSelector((state) => state.authReducer);
  const { loading, isLoggedIn } = authState;
  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate(redirectUrl || "/");
    }
  }, [authState, redirectUrl, isLoggedIn, navigate]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("login", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }
    dispatch(postLoginData(formData.email, formData.password));
  };

  const fieldError = (field) => (
    <p
      className={`mt-1 text-pink-600 text-sm ${
        formErrors[field] ? "block" : "hidden"
      }`}
    >
      <i className="mr-2 fa-solid fa-circle-exclamation"></i>
      {formErrors[field]}
    </p>
  );

  return (
    <>
      <div className="min-h-[calc(100vh-80px)] bg-gray-100 flex items-center justify-center"> {/* Main container for centering */}
      <form className="max-w-md w-full bg-white p-6 md:p-8 border rounded-md shadow-md"> {/* Responsive form */}
        {loading ? (
          <Loader />
        ) : (
          <>
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800"> {/* Improved heading */}
            Login to TaskFlow
            </h2>
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Email
              </label>
              <Input
                type="text"
                name="email"
                id="email"
                value={formData.email}
                placeholder="youremail@domain.com"
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Styled input
              />
              {fieldError("email")}
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
              >
                Password
              </label>
              <Input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                placeholder="Your password..."
                onChange={handleChange}
                className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" // Styled input
              />
              {fieldError("password")}
            </div>

            <button
              className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-300" // Full-width button
              onClick={handleSubmit}
            >
              Submit
            </button>

            <div className="mt-6 text-center">
              Don't have an account?
              <Link to="/signup" className="text-blue-500 hover:underline"> {/* Added underline on hover */}
                Signup here
              </Link>
            </div>
          </>
        )}
      </form>
    </div>
    </>
  );
};

export default LoginForm;
