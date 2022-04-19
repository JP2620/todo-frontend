import { Component, useEffect, useState } from "react";
import { Navigate, RouteProps, useParams } from "react-router-dom";
import FoldersView from "./FoldersView";

interface tasksViewProps extends RouteProps {
    username: string
};

function TasksView(props: tasksViewProps) {

    const [tasks, fetchTasks] = useState<any>([]);
    const [newTask, setNewTask] = useState("");

    const params = useParams();
    const getTasks = () => {
        fetch("http://localhost:5001/api/todo/folder/" + params.folder, {
            credentials: "include"
        })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                fetchTasks(res);
            })
    }

    useEffect(() => {
        getTasks()
    }, []);
    if (props.username === "")
        return <Navigate to="/" replace/>


    return (
        <div className="tasks-container">
            <h1 className="tasks-header" style={{fontSize: "24px"}} >{"Folders > " + params.folder}</h1>
            <main className="tasks-main">
                <ul className="task-list">
                    {
                        tasks.map((task: any) =>
                            <li className="task-item">
                                <div className="checkbox-div">
                                    <input className="task-checkbox" type="checkbox" name={task.name} defaultChecked={task.state === "Completed"} />
                                </div>
                                <p className="task-name">{task.name}</p>
                                <p className="task-edit">Edit</p>
                            </li>
                        )
                    }
                </ul>
                <form className="task-form" method="post" onSubmit={(event: any) => {
                    const data = {
                        folder: params.folder,
                        owner: props.username,
                        description: newTask
                    };
                    fetchTasks([...tasks, { name: newTask }]);
                    event.preventDefault();
                    fetch("http://localhost:5001/api/todo/task", {
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json,text/*;q=0.99",
                        }
                    });
                    console.log(tasks);
                }}>
                    <input type="text"
                        name="newTask"
                        placeholder="New Task"
                        required
                        onChange={e => setNewTask(e.target.value)}
                    />
                    <button type="submit">
                        Add
                    </button>
                </form>
            </main>

        </div>
    )
}

export default TasksView;