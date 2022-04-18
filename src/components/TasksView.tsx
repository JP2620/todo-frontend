import { Component, useEffect, useState } from "react";
import { RouteProps, useParams } from "react-router-dom";
import FoldersView from "./FoldersView";

interface tasksViewProps extends RouteProps {
    username: string
};

function TasksView(props: tasksViewProps) {
    const [tasks, fetchTasks] = useState<any> ([]);
    const [newTask, setNewTask] = useState("");

    const params = useParams();
    const getTasks = () => {
        fetch("http://localhost:5001/api/todo/folder/" + params.folder,{
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


    
    

    return (
        <div>
            <div>{"Folders > " + params.folder}</div>
            <ul>
                {
                    tasks.map((task: any) => 
                        <li>
                            <p>{task.name}</p>
                            <button>Edit</button>
                        </li>
                    )
                }
            </ul>
            <form method="post" onSubmit={(event: any) => {
                    const data = {
                        folder: params.folder,
                        owner: props.username,
                        description: newTask
                    };
                    fetchTasks([...tasks, {name: newTask}]);
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
        </div>
    )
}

export default TasksView;