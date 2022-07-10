import Folder from "./Folder";

interface Task {
  id: number;
  folder: Folder;
  name: string;
  state: string;
}

export default Task;
