export interface Task {
    id: string;
    name: string;
    status: string;
    priority: string;
    createdAt: string;
  }

export interface TodoItemDetail {
    id: string;
    name: string;
    createdAt: string;
    totalTasks: number;
    completedTasks: number;
    tasks?: Task[];
  }

export interface UserCreds {
    email: string;
    password: string;
    firstName: string;
    lastName: string;
}