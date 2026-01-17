import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import Loader from "./utils/Loader";
import Tooltip from "./utils/Tooltip";

const Tasks = () => {
  const authState = useSelector((state) => state.authReducer);
  const [tasks, setTasks] = useState([]);
  const [fetchData, { loading }] = useFetch();

  const fetchTasks = useCallback(() => {
    const config = {
      url: "/tasks",
      method: "get",
      headers: { Authorization: authState.token },
    };
    fetchData(config, { showSuccessToast: false }).then((data) =>
      setTasks(data.tasks)
    );
  }, [authState.token, fetchData]);

  useEffect(() => {
    if (!authState.isLoggedIn) return;
    fetchTasks();
  }, [authState.isLoggedIn, fetchTasks]);

  const handleDelete = (id) => {
    const config = {
      url: `/tasks/${id}`,
      method: "delete",
      headers: { Authorization: authState.token },
    };
    fetchData(config).then(() => fetchTasks());
  };

  return (
    <>
      <div className="my-2 mx-auto max-w-[700px] py-4">
        {tasks.length !== 0 && (
          <h2 className="my-2 ml-2 md:ml-0 text-xl">
            Your Tasks ({tasks.length})
          </h2>
        )}
        {loading ? (
          <Loader />
        ) : (
          <div>
            {tasks.length === 0 ? (
              <div className="flex flex-col items-center justify-center gap-4 py-8 px-4 text-center">
                <span className="text-lg text-gray-600">No tasks found</span>
                <Link
                  to="/tasks/add"
                  className="bg-blue-500 text-white hover:bg-blue-600 font-medium rounded-md px-4 py-2 transition duration-300"
                >
                  + Add new task
                </Link>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {tasks.map((task, index) => (
                  <div
                    key={task._id}
                    className="bg-white rounded-md shadow-md p-4 transition duration-300 hover:shadow-lg"
                  >
                    <div className="flex items-start">
                      <span className="font-medium text-lg text-gray-800">
                        Task {index + 1}
                      </span>
                      <div className="ml-auto flex gap-2">
                        <Tooltip text={"Edit this task"} position={"top"}>
                          <Link
                            to={`/tasks/${task._id}`}
                            className="text-green-600 hover:text-green-700 transition duration-300 cursor-pointer"
                          >
                            <i className="fa-solid fa-pen"></i>
                          </Link>
                        </Tooltip>
                        <Tooltip text={"Delete this task"} position={"top"}>
                          <span
                            className="text-red-500 hover:text-red-600 transition duration-300 cursor-pointer"
                            onClick={() => handleDelete(task._id)}
                          >
                            <i className="fa-solid fa-trash"></i>
                          </span>
                        </Tooltip>
                      </div>
                    </div>
                    <div className="mt-2 text-gray-600 whitespace-pre-wrap break-words">
                      {task.description}
                    </div>
                  </div>
                ))}
                <Link
                  to="/tasks/add"
                  className="block flex items-center justify-center gap-2 px-4 py-2 rounded-md bg-blue-500 hover:bg-blue-600 text-white font-medium transition duration-300"
                >
                  <i className="fa-solid fa-plus"></i> Add task
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
};

export default Tasks;
