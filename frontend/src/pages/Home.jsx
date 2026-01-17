import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Tasks from "../components/Tasks";
import MainLayout from "../layouts/MainLayout";

const Home = () => {
  const authState = useSelector((state) => state.authReducer);
  const { isLoggedIn } = authState;

  useEffect(() => {
    document.title = authState.isLoggedIn
      ? `${authState.user.name}'s Tasks`
      : "TaskFlow";
  }, [authState]);

  return (
    <>
      <MainLayout>
        {!isLoggedIn ? (
          <div className="bg-gradient-to-r from-gray-500 to-purple-800 text-white min-h-[50vh] md:h-[40vh] py-12 px-6 md:px-0 flex flex-col items-center justify-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Welcome to TaskFlow
            </h1>
            <Link
              to="/signup"
              className="mt-8 md:mt-10 text-xl md:text-2xl font-medium px-6 py-3 rounded-lg transition duration-300 flex items-center bg-indigo-200 hover:bg-rose-200 text-black"
            >
              <div className="flex flex-col">
                <span>
                  Join now to unleash your potential{" "}
                  <i className="fa-solid fa-arrow-right ml-2"></i>
                </span>
              </div>
            </Link>
          </div>
        ) : (
          <div className="px-4 md:px-8 py-6 bg-gray-50 md:bg-white min-h-[calc(100vh-80px)]">
            <div className="max-w-7xl mx-auto">
              <h1 className="text-3xl font-bold mt-8 mb-6 text-gray-800 md:text-4xl md:mt-12 md:mb-8">
                Welcome, {authState.user.name} !
              </h1>
              <div className="bg-white rounded-lg shadow-md p-6 md:p-8">
                <Tasks />
              </div>
            </div>
          </div>
        )}
      </MainLayout>
    </>
  );
};

export default Home;
