import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Folder from "../types/Folder";
import { UserContext } from "../userContext";

function FoldersView() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [newFolder, setNewFolder] = useState<string>("");
  const { user, setUser } = useContext(UserContext);

  const getFolders = () => {
    fetch("http://localhost:5001/api/todo/folder", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((res) => setFolders(res));
  };

  useEffect(() => {
    getFolders();
  }, []);
  if (!(user && user.id)) return <Navigate to="/" replace />;

  const handleRemoveFolder = (folderName: string) => (event: any) => {
    event.preventDefault();
    fetch("http://localhost:5001/api/todo/folder", {
      method: "DELETE",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json,text/*;q=0.99",
      },
      body: JSON.stringify({
        owner: user.username,
        name: folderName,
      }),
    });
    setFolders(folders.filter((item: Folder) => item.name !== folderName));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data = {
      owner: user.username,
      name: newFolder,
    };
    setFolders([...folders, { name: newFolder }]);
    fetch("http://localhost:5001/api/todo/folder", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json,text/*;q=0.99",
      },
      body: JSON.stringify({
        owner: user.username,
        name: newFolder,
      }),
    }).then(() => {
      const input: any = document.getElementById("new-folder-input");
      input.value = "";
    });
  };

  return (
    <div className="folders-container">
      <h1 className="folders-header">{user.username + "'s Folders"}</h1>
      <main className="folders-main">
        <ul className="folder-list">
          {folders.map((folder) => (
            <li key={folder.name} className="folder-item">
              <p className="folder-name">{folder.name}</p>
              <Link
                to={"/folders/" + folder.name}
                className="folder-view-items"
              >
                View items
              </Link>
              <p
                className="folder-remove"
                onClick={handleRemoveFolder(folder.name)}
              >
                Remove
              </p>
            </li>
          ))}
        </ul>

        <form className="folder-form" method="post" onSubmit={handleSubmit}>
          <input
            id="new-folder-input"
            type="text"
            name="newFolder"
            placeholder="New Folder"
            required
            onChange={(e) => setNewFolder(e.target.value)}
          />
          <button type="submit">Add</button>
        </form>
      </main>
    </div>
  );
}

export default FoldersView;
