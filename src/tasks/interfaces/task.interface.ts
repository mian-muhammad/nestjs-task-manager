export interface Task {
  _id?: string;
  description: string;
  completed?: boolean;
  owner: string;
}
