import React, { FormEvent, LegacyRef, useContext, useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import TasksService from "../services/TasksService";
import { NewTaskDto } from "../types/NewTaskDto";
import Task from "../types/Task";
import { UserContext } from "../userContext";
import TaskItem from "./TaskItem";
import { useAutoAnimate } from "@formkit/auto-animate/react";
import "./TasksView.css";
import Icons from "../Icons";

const TasksView = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<string>("");
  const [lastUpdateTimestamp, setLastUpdateTimestamp] = useState<Date>(
    new Date()
  );
  const { user } = useContext(UserContext);

  const params = useParams();
  const [parent] = useAutoAnimate();

  useEffect(() => {
    if (params.folder) {
      TasksService.getTasks(params.folder)
        .then((res) => res.json())
        .then((res) => {
          setTasks(res);
        });
    }
  }, [lastUpdateTimestamp]);

  const handleSubmitNewTask = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data: NewTaskDto = {
      folderName: params.folder as string,
      name: newTask,
    };
    TasksService.createTask(data).then(() => {
      setLastUpdateTimestamp(new Date());
      setNewTask("");
    });
  };

  if (!(user && user)) return <Navigate to="/" replace />;

  return (
    <div className="tasks-container">
      <div className="tasks-layout">
        <div>
          <Link to="/folders">
            <Icons.LeftArrow className="previous-page-link" />
          </Link>
        </div>
        <h1 className="tasks-header">
          {"Folders "}
          <Icons.Breadcrumb className='tasks-header-breadcrumb'/>
          {params.folder}
        </h1>
        <main className="tasks-main">
          <ul className="task-list" ref={parent as LegacyRef<HTMLUListElement>}>
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
          <form className="task-form" onSubmit={handleSubmitNewTask}>
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
    </div>
  );
};

export default TasksView;
