import { NewTaskDto } from "../types/NewTaskDto";

class TasksService {
  private baseUrl: string;
  constructor() {
    this.baseUrl = "http://localhost:5001/api/todo/task/";
  }

  getTasks = (folderName: string) => {
    return fetch("http://localhost:5001/api/todo/folder/" + folderName, {
      credentials: "include",
    });
  };

  createTask = (data: NewTaskDto) => {
    return fetch(this.baseUrl, {
      method: "POST",
      credentials: "include",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json,text/*;q=0.99",
      },
    });
  };
}

export default new TasksService();
