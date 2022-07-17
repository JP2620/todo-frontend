import React, { FormEvent, useContext, useEffect, useState } from "react";
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
  const { user } = useContext(UserContext);

  if (!(user && user.id)) return <Navigate to="/" replace />;

  useEffect(() => {
    FoldersService.getFolders()
      .then((res) => res.json())
      .then((data) => setFolders(data));
  }, [lastChangeTimestamp]);

  const handleRemoveFolder = (folderId: number) => {
    FoldersService.deleteFolder(folderId).then(() =>
      setLastChangeTimestamp(new Date())
    );
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data: NewFolderDto = {
      owner: user.username,
      name: newFolder,
    };
    FoldersService.createFolder(data).then(() => {
      setNewFolder("");
      setLastChangeTimestamp(new Date());
    });
  };

  return (
    <div className="folders-container">
      <h1 className="folders-header">Your folders</h1>
      <main className="folders-content">
        <ul className="folders-list">
          {folders.map((folder) => (
            <li key={folder.name} className="folder-item">
              <p className="folder-name">{folder.name}</p>
              <Link to={"/folder/" + folder.name} className="folder-view-items">
                View items
              </Link>
              <p
                className="folder-remove"
                onClick={() => handleRemoveFolder(folder.id)}
              >
                Remove
              </p>
            </li>
          ))}
        </ul>

        <form className="folder-form" method="post" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="New Folder"
            required
            onChange={(e) => setNewFolder(e.target.value)}
            value={newFolder}
          />
          <button type="submit">Add</button>
        </form>
      </main>
    </div>
  );
}

export default FoldersView;
