import React, { useEffect } from "react";
import EditTaskModal from "./EditTaskModal";

type TaskItemProps = {
    taskName: string;
    completed: string;
    username: string;
    folder: string | undefined;
}

function TaskItem(props: TaskItemProps) {
    const [checked, setChecked] = React.useState(props.completed === "Completed");
    const [modalOpen, setModalOpen] = React.useState(false);
    const handleClick = (event: any) => {
        setChecked(!checked);
    }

    useEffect(() => {
        const data = {
            owner: props.username,
            folder: props.folder,
            old_description: props.taskName,
            state: checked? "Completed" : "Uncompleted"
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
    }, [checked]);

    return (
        <li className="task-item">
            <div className="checkbox-div">
                <input className="task-checkbox" type="checkbox" defaultChecked={checked} onClick={handleClick} />
            </div>
            <p className="task-name">{props.taskName}</p>
            <p className="task-edit" onClick={() => setModalOpen(true)} >Edit</p>
            {modalOpen && <EditTaskModal openModal={setModalOpen}/>}
        </li>
    )


}

export default TaskItem;
