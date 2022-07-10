import React, { useContext, useEffect, useState } from "react";
import { Link, Navigate } from "react-router-dom";
import FoldersService from "../services/FoldersService";
import Folder from "../types/Folder";
import { NewFolderDto } from "../types/NewFolderDto";
import { UserContext } from "../userContext";

function FoldersView() {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [lastChangeTimestamp, setLastChangeTimestamp] = useState<Date>(
    new Date()
  );
  const [newFolder, setNewFolder] = useState<string>("");
  const { user, setUser } = useContext(UserContext);

  useEffect(() => {
    FoldersService.getFolders()
      .then((res) => res.json())
      .then((res) => setFolders(res));
  }, []);
  if (!(user && user.id)) return <Navigate to="/" replace />;

  const handleRemoveFolder = (folderId: number) => (event: any) => {
    event.preventDefault();
    FoldersService.deleteFolder(folderId);
    setLastChangeTimestamp(new Date());
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const data: NewFolderDto = {
      owner: user.username,
      name: newFolder,
    };
    setLastChangeTimestamp(new Date());
    FoldersService.createFolder(data);
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
                onClick={handleRemoveFolder(folder.id)}
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
