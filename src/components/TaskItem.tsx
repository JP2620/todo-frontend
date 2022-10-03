import React, { useEffect, useState } from "react";
import Icons from '../Icons';
import "./TaskItem.css";

type TaskItemProps = {
  id: number;
  name: string;
  completed: string;
  setLastUpdateTimestamp: (timestamp: Date) => void;
};

const TaskItem = (props: TaskItemProps) => {
  const { id, name, setLastUpdateTimestamp } = props;
  const [completed, setCompleted] = useState<boolean>(
    props.completed === "Completed"
  );

  const handleClick = () => {
    setCompleted((prevCompleted) => !prevCompleted);
  };

  useEffect(() => {
    const data = {
      id: props.id,
      name: name,
      state: completed ? "Completed" : "Uncompleted",
    };
    fetch("http://localhost:5001/api/todo/task", {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json,text/*;q=0.99",
      },
    }).then(() => props.setLastUpdateTimestamp(new Date()));
  }, [name, completed]);

  return (
    <li className="task-item">
      <input
        className="task-checkbox"
        type="checkbox"
        defaultChecked={completed}
        onClick={handleClick}
      />
      <p className="task-name">{name}</p>
      <Icons.Edit className="task-edit" />
    </li>
  );
};

export default TaskItem;
