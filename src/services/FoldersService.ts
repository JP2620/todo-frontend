import { NewFolderDto } from "../types/NewFolderDto";

class FoldersService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:5001/api/todo/folder";
  }

  createFolder = async (folder: NewFolderDto) => {
    return fetch(this.baseUrl, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json,text/*;q=0.99",
      },
      body: JSON.stringify(folder),
    });
  };

  getFolders = async () => {
    return fetch("http://localhost:5001/api/todo/folder", {
      credentials: "include",
    });
  };

  deleteFolder = async (folderId: number) => {
    return fetch(`http://localhost:5001/api/todo/folder/${folderId}`, {
      method: "DELETE",
      credentials: "include",
      headers: {
        Accept: "application/json,text/*;q=0.99",
      },
    });
  };
}

export default new FoldersService();
