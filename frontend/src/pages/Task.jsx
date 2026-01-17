import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Textarea } from "../components/utils/Input";
import Loader from "../components/utils/Loader";
import useFetch from "../hooks/useFetch";
import MainLayout from "../layouts/MainLayout";
import validateManyFields from "../validations";

const Task = () => {
  const authState = useSelector((state) => state.authReducer);
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const { taskId } = useParams();

  const mode = taskId === undefined ? "add" : "update";
  const [task, setTask] = useState(null);
  const [formData, setFormData] = useState({
    description: "",
  });
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    document.title = mode === "add" ? "Add task" : "Update Task";
  }, [mode]);

  useEffect(() => {
    if (mode === "update") {
      const config = {
        url: `/tasks/${taskId}`,
        method: "get",
        headers: { Authorization: authState.token },
      };
      fetchData(config, { showSuccessToast: false }).then((data) => {
        setTask(data.task);
        setFormData({ description: data.task.description });
      });
    }
  }, [mode, authState, taskId, fetchData]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleReset = (e) => {
    e.preventDefault();
    setFormData({
      description: task.description,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateManyFields("task", formData);
    setFormErrors({});

    if (errors.length > 0) {
      setFormErrors(
        errors.reduce((total, ob) => ({ ...total, [ob.field]: ob.err }), {})
      );
      return;
    }

    if (mode === "add") {
      const config = {
        url: "/tasks",
        method: "post",
        data: formData,
        headers: { Authorization: authState.token },
      };
      fetchData(config).then(() => {
        navigate("/");
      });
    } else {
      const config = {
        url: `/tasks/${taskId}`,
        method: "put",
        data: formData,
        headers: { Authorization: authState.token },
      };
      fetchData(config).then(() => {
        navigate("/");
      });
    }
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
      <MainLayout>
        <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-gray-100">
          <form className="max-w-2xl w-full bg-white p-6 md:p-8 border rounded-md shadow-md md:max-w-[1000px]">
            {loading ? (
              <Loader />
            ) : (
              <>
                <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                  {mode === "add" ? "Add New Task" : "Edit Task"}
                </h2>
                <div className="mb-4">
                  <label
                    htmlFor="description"
                    className="block text-gray-700 font-medium mb-2"
                  >
                    Description
                  </label>
                  <Textarea
                    type="description"
                    name="description"
                    id="description"
                    value={formData.description}
                    placeholder="Write here.."
                    onChange={handleChange}
                    className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  {fieldError("description") && (
                    <p className="text-red-500 mt-1">
                      {fieldError("description")}
                    </p>
                  )}
                </div>

                <div className="flex justify-center">
                  <button
                    className="bg-blue-500 text-white px-4 py-2 font-medium rounded-md hover:bg-blue-600 transition duration-300"
                    onClick={handleSubmit}
                  >
                    {mode === "add" ? "Add task" : "Update Task"}
                  </button>
                  <button
                    className="ml-4 bg-red-500 text-white px-4 py-2 font-medium rounded-md hover:bg-red-600 transition duration-300"
                    onClick={() => navigate("/")}
                  >
                    Cancel
                  </button>
                  {mode === "update" && (
                    <button
                      className="ml-4 bg-gray-500 text-black px-4 py-2 font-medium rounded-md hover:bg-gray-600 hover:text-white transition duration-300" // Improved button styling
                      onClick={handleReset}
                    >
                      Reset
                    </button>
                  )}
                </div>
              </>
            )}
          </form>
        </div>
      </MainLayout>
    </>
  );
};

export default Task;
