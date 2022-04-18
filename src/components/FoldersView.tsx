import React, { FormEvent, useEffect, useState } from "react";
import { Link } from 'react-router-dom'

type folderViewProps = {
    username: string
}
function FoldersView(props: folderViewProps) {
    const [folders, fetchFolders] = useState<any>([]);
    const [newFolder, setNewFolder] = useState<string>("");

    const getFolders = () => {
        fetch("http://localhost:5001/api/todo/folder",
            {
                credentials: "include"
            })
            .then((res) => res.json())
            .then((res) => {
                console.log(res);
                fetchFolders(res);
            })
    };

    useEffect(() => {
        getFolders()
    }, [])

    const handleRemoveFolder = (folderName: string) => (event: any) => {
        event.preventDefault();
        fetch("http://localhost:5001/api/todo/folder",
        {
            method: "DELETE",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json,text/*;q=0.99",
            },
            body: JSON.stringify({
                owner: props.username,
                name: folderName
            })
        });
        fetchFolders(folders.filter((item: any) => item.name !== folderName));
    };

    return (
        <div>
            <div>
                <h1>{props.username + "'s Folders"}</h1>
            </div>
            <div>
                {
                    folders.map((folder: any) =>
                        <li>
                            <form method="delete" onSubmit={handleRemoveFolder(folder.name)}>
                                <p>{folder.name}</p>
                                <Link to={"/folders/" + folder.name} >
                                    View items
                                </Link>
                                <button type="submit">Remove</button>
                            </form>

                        </li>
                    )
                }
            </div>
            <form method="post" onSubmit={(event:any) => {
                event.preventDefault();
                const data = {
                    owner: props.username,
                    name: newFolder
                };
                fetchFolders([...folders, {name: newFolder}]);
                fetch("http://localhost:5001/api/todo/folder",
                {
                    method: "POST",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                        Accept: "application/json,text/*;q=0.99",
                    },
                    body: JSON.stringify({
                        owner: props.username,
                        name: newFolder
                    })
                });
                console.log(folders);
            }}>
                <input type="text" 
                    name="newTask" 
                    placeholder="New Task"
                    required 
                    onChange={e => setNewFolder(e.target.value)}
                    />
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default FoldersView;