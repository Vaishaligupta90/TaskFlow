import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import validateManyFields from "../validations";
import Input from "./utils/Input";
import Loader from "./utils/Loader";

const SignupForm = () => {
  const [formErrors, setFormErrors] = useState({});
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [fetchData, { loading }] = useFetch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("signup", formData);
    setFormErrors({});
    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }

    const config = { url: "/auth/signup", method: "post", data: formData };
    fetchData(config).then(() => {
      navigate("/login");
    });
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
      <div className="min-h-[calc(100vh-80px)] bg-gray-100 flex items-center justify-center">
        <form className="max-w-md w-full bg-white p-6 md:p-8 border rounded-md shadow-md">
          {loading ? (
            <Loader />
          ) : (
            <>
              <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                Sign up for TaskFlow
              </h2>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-medium mb-2 after:content-['*'] after:ml-0.5 after:text-red-500"
                >
                  Name
                </label>
                <Input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  placeholder="Your name"
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {fieldError("name")}
              </div>

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
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                  className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                {fieldError("password")}
              </div>

              <button
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 rounded-md transition duration-300"
                onClick={handleSubmit}
              >
                Submit
              </button>

              <div className="mt-6 text-center">
                Already have an account?
                <Link to="/login" className="text-blue-500 hover:underline">
                  Login here
                </Link>
              </div>
            </>
          )}
        </form>
      </div>
    </>
  );
};

export default SignupForm;
