import React, { FormEvent, useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import Task from "../types/Task";
import { UserContext } from "../userContext";
import TaskItem from "./TaskItem";

const TasksView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState<Date>(
    new Date()
  );
  const { user } = useContext(UserContext);

  const params = useParams();
  const getTasks = () => {
    fetch("http://localhost:5001/api/todo/folder/" + params.folder, {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => {
        setTasks(res);
      });
  };

  useEffect(() => {
    getTasks();
  }, [lastUpdateTimestamp]);

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
          {tasks.map((task: Task) => (
            <TaskItem
              key={task.id}
              id={task.id}
              name={task.name}
              completed={task.state}
              setLastUpdateTimestamp={setLastUpdateTimestamp}
            />
          ))}
        </ul>
        <form
          className="task-form"
          onSubmit={(event: FormEvent<HTMLFormElement>) => {
            event.preventDefault();
            const data = {
              folderName: params.folder,
              name: newTask,
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
              getTasks();
              setNewTask("");
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
            value={newTask}
          />
          <button type="submit">Add</button>
        </form>
      </main>
    </div>
  );
};

export default TasksView;
