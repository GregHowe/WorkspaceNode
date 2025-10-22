import { useEffect, useState } from 'react';
import { getAllTasks, updateTask, deleteTask } from '../api/task';
import { Task } from '../types/task';
import TaskForm from './TaskForm';

function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    getAllTasks().then(setTasks).catch(console.error);
  }, []);

  const handleNewTask = (task: Task) => {
    setTasks(prev => [...prev, task]);
  };

const handleEdit = async (id: string) => {
  const updated = await updateTask(id, { status: 'done' }); 
  setTasks(prev => prev.map(t => (t._id === id ? updated : t)));
};

const handleDelete = async (id: string) => {
   console.log('ID recibido para eliminar:', id);
  await deleteTask(id);
  setTasks(prev => prev.filter(t => t._id !== id));
};

  return (
    <div>
      <h2>Lista de Tareas</h2>
      <TaskForm onTaskCreated={handleNewTask} />
      <ul>

      {tasks.map(task => (
        <li key={task._id}>
          <strong>{task.title}</strong> – {task.status}
          <button onClick={() => handleEdit(task._id)}>Editar</button>
          <button onClick={() => handleDelete(task._id)}>Eliminar</button>
        </li>
      ))}

      </ul>
    </div>
  );
}

export default TaskList;
