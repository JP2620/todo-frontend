import { useContext, useEffect, useState } from "react";
import { Link, Navigate } from 'react-router-dom'
import { UserContext, UserContextType } from "../userContext";

function FoldersView() {

    const [folders, fetchFolders] = useState<any>([]);
    const [newFolder, setNewFolder] = useState<string>("");
    const userContext: UserContextType | null = useContext(UserContext);


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
    if (userContext?.username === "")
        return <Navigate to="/" replace/>

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
                    owner: userContext?.username,
                    name: folderName
                })
            });
        fetchFolders(folders.filter((item: any) => item.name !== folderName));
    };

    const handleSubmit = (event: any) => {
        event.preventDefault();
        const data = {
            owner: userContext?.username,
            name: newFolder
        };
        fetchFolders([...folders, { name: newFolder }]);
        fetch("http://localhost:5001/api/todo/folder",
            {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json,text/*;q=0.99",
                },
                body: JSON.stringify({
                    owner: userContext?.username,
                    name: newFolder
                })
            })
            .then(() => {
                const input: any = document.getElementById("new-folder-input");
                input.value = "";
            })
        console.log(folders);
    }

    return (
        <div className="folders-container">
            <h1 className="folders-header">{userContext?.username + "'s Folders"}</h1>
            <main className="folders-main">
                <ul className="folder-list">
                    {
                        folders.map((folder: any) =>
                            <li className="folder-item">
                                <p className="folder-name">{folder.name}</p>
                                <Link to={"/folders/" + folder.name} className="folder-view-items" >
                                    View items
                                </Link>
                                <p className="folder-remove" onClick={handleRemoveFolder(folder.name)}>Remove</p>
                            </li>
                        )
                    }
                </ul>

                <form className="folder-form" method="post" onSubmit={handleSubmit}>
                    <input 
                        id="new-folder-input" 
                        type="text"
                        name="newFolder"
                        placeholder="New Folder"
                        required
                        onChange={e => setNewFolder(e.target.value)}
                    />
                    <button type="submit">Add</button>
                </form>
            </main>
        </div>
    )
}

export default FoldersView;