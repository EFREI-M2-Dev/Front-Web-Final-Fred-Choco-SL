import { Task } from "./task.model";
import {Tag} from "./tag.model";

export interface Project {
  id: number;
  name: string;
  description?: string;
  tasks: Task[];
  tags: Tag[];
  createdAt: string; // Utilisez `string` pour les dates dans les API
  updatedAt: string;
}

