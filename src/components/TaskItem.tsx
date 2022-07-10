import React, { useEffect, useState } from "react";

type TaskItemProps = {
  taskName: string;
  completed: string;
  userId: number;
  folderId: number;
};

function TaskItem(props: TaskItemProps) {
  const [state, setState] = useState({
    owner: props.userId,
    folder: props.folderId,
    name: props.taskName,
    checked: props.completed === "Completed",
  });
  const handleClick = () => {
    setState({
      ...state,
      checked: !state.checked,
    });
  };

  useEffect(() => {
    const data = {
      owner: state.owner,
      folder: props.folderId,
      old_description: state.name,
      state: state.checked ? "Completed" : "Uncompleted",
    };
    fetch("http://localhost:5001/api/todo/task", {
      method: "PATCH",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json,text/*;q=0.99",
      },
    });
  }, [state.name, state.checked]);
  console.log(state);

  return (
    <li className="task-item">
      <div className="checkbox-div">
        <input
          className="task-checkbox"
          type="checkbox"
          defaultChecked={state.checked}
          onClick={handleClick}
        />
      </div>
      <p className="task-name">{state.name}</p>
      <p className="task-edit">
        Edit
      </p>
    </li>
  );
}

export default TaskItem;
