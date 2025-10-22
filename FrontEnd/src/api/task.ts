import api from './index';
import { Task } from '../types/task';



export const getAllTasks = async (): Promise<Task[]> => {
  const response = await api.get('/tasks');
  return response.data;
};

export const createTask = async (task: Omit<Task, 'id'>): Promise<Task> => {
  const response = await api.post('/tasks', task);
  return response.data;
};

export const updateTask = async (id: string, updates: Partial<Task>): Promise<Task> => {
  const response = await api.put(`/tasks/${id}`, updates);
  return response.data;
};

export const deleteTask = async (id: string): Promise<void> => {
  await api.delete(`/tasks/${id}`);
};


