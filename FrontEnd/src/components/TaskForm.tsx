import { useState } from 'react';
import { createTask } from '../api/task';
import { Task } from '../types/task';
import { toast } from 'react-toastify';

function TaskForm({ onTaskCreated }: { onTaskCreated: (task: Task) => void }) {
  const [title, setTitle] = useState('');
  const [status, setStatus] = useState<'pending' | 'done'>('pending');

  const handleSubmit = async (e: React.FormEvent) => {
    debugger;
    e.preventDefault();
    if (!title.trim()) {
      console.error('❌ El título no puede estar vacío');
       toast.error('El título de la tarea no puede estar vacío');
      return;
    }
    const newTask = await createTask({ title, status, description: '', dueDate: null });
    onTaskCreated(newTask);
    setTitle('');
    setStatus('pending');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Título de la tarea"
        value={title}
        onChange={e => setTitle(e.target.value)}
        // required 
      />
      <select value={status} onChange={e => setStatus(e.target.value as any)}>
        <option value="pending">Pendiente</option>
        <option value="done">Hecha</option>
      </select>
      <button type="submit">Crear tarea</button>
    </form>
  );
}

export default TaskForm;
