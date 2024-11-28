export interface Task {
  id: number;
  name: string;
  description: string;
  statusId: number;
  assignee: {
    id: number;
    name: string;
    surname: string;
    email: string;
  }
}

