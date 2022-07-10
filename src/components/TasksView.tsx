import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { UserContext } from "../userContext";
import TaskItem from "./TaskItem";

function TasksView() {
  const [tasks, fetchTasks] = useState<any>([]);
  const [newTask, setNewTask] = useState("");
  const { user, setUser } = useContext(UserContext);

  const params = useParams();
  const getTasks = () => {
    fetch("http://localhost:5001/api/todo/folder/" + params.folder, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        fetchTasks(res);
      });
  };

  useEffect(() => {
    getTasks();
  }, []);
  if (!(user && user)) return <Navigate to="/" replace />;

  return (
    <div className="tasks-container">
      <div>
        <Link to="/folders">
          <a className="previous-page-link">
            <span className="material-symbols-outlined">arrow_back</span>
          </a>
        </Link>
      </div>
      <h1 className="tasks-header" style={{ fontSize: "24px" }}>
        {"Folders "}
        <span className="material-symbols-outlined">
          arrow_forward_ios
        </span>{" "}
        {params.folder}
      </h1>
      <main className="tasks-main">
        <ul className="task-list">
          {tasks.map((task: any) => (
            <TaskItem
              key={task.name}
              username={user.username}
              folder={params.folder}
              taskName={task.name}
              completed={task.state}
            />
          ))}
        </ul>
        <form
          className="task-form"
          onSubmit={(event: any) => {
            event.preventDefault();
            const data = {
              folder: params.folder,
              owner: user.username,
              description: newTask,
            };

            fetch("http://localhost:5001/api/todo/task", {
              method: "POST",
              credentials: "include",
              body: JSON.stringify(data),
              headers: {
                "Content-Type": "application/json",
                Accept: "application/json,text/*;q=0.99",
              },
            }).then(() => {
              fetchTasks([...tasks, { name: newTask }]);
              const input: any = document.getElementById("new-task-input");
              input.value = "";
            });
          }}
        >
          <input
            id="new-task-input"
            type="text"
            name="newTask"
            placeholder="New Task"
            required
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </main>
    </div>
  );
}

export default TasksView;
