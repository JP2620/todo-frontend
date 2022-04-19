import { Component, useEffect, useState } from "react";
import { Navigate, RouteProps, useParams } from "react-router-dom";
import FoldersView from "./FoldersView";
import TaskItem from "./TaskItem";

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
        return <Navigate to="/" replace />


    return (
        <div className="tasks-container">
            <h1 className="tasks-header" style={{ fontSize: "24px" }} >{"Folders > " + params.folder}</h1>
            <main className="tasks-main">
                <ul className="task-list">

                    {
                        tasks.map((task: any) =>
                            <TaskItem username={props.username} folder={params.folder} taskName={task.name} completed={task.state} />)
                    }
                </ul>
                <form className="task-form" onSubmit={(event: any) => {
                    event.preventDefault();
                    const data = {
                        folder: params.folder,
                        owner: props.username,
                        description: newTask
                    };
                    
                    fetch("http://localhost:5001/api/todo/task", {
                        method: "POST",
                        credentials: "include",
                        body: JSON.stringify(data),
                        headers: {
                            "Content-Type": "application/json",
                            Accept: "application/json,text/*;q=0.99",
                        }
                    })
                        .then(() => fetchTasks([...tasks, { name: newTask }]))

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