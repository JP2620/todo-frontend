import React, { useEffect, useState } from "react";
import EditTaskModal from "./EditTaskModal";

type TaskItemProps = {
    taskName: string;
    completed: string;
    username: string;
    folder: string | undefined;
}

function TaskItem(props: TaskItemProps) {
    const [modalOpen, setModalOpen] = React.useState(false);
    const [state, setState] = useState({
        owner: props.username,
        folder: props.folder,
        name: props.taskName,
        checked: props.completed === "Completed",
    })
    const handleClick = (event: any) => {
        setState({
            ...state,
            checked: !state.checked
        });
    }

    useEffect(() => {
        const data = {
            owner: state.owner,
            folder: props.folder,
            old_description: state.name,
            state: state.checked ? "Completed" : "Uncompleted"
        };
        fetch("http://localhost:5001/api/todo/task", {
            method: "PATCH",
            credentials: "include",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json,text/*;q=0.99",
            }
        })
        console.log(data);
    }, [state.name, state.checked]);

    const editTaskModalProps = {
        openModal: setModalOpen,
        setState: setState,
        ...state,
    }

    return (
        <li className="task-item">
            <div className="checkbox-div">
                <input className="task-checkbox" type="checkbox" defaultChecked={state.checked} onClick={handleClick} />
            </div>
            <p className="task-name">{state.name}</p>
            <p className="task-edit" onClick={() => setModalOpen(true)} >Edit</p>
            {modalOpen && <EditTaskModal {...editTaskModalProps} />}
        </li>
    )


}

export default TaskItem;
