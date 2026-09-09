import { useState, useEffect } from 'react';
import api from '../services/api';
import Column from './Column';

function Board() {
  const [tasks, setTasks] = useState([]);
  const [nuevoTitulo, setNuevoTitulo] = useState('');

  // Paso 2: borra la línea de abajo y descomenta cambiarEstado() completo.

  // Paso 5: reemplaza cambiarEstado por esta versión, que guarda el estado
  // nuevo en la API antes de actualizar la pantalla.
  const cambiarEstado = (id, nuevoEstado) => {
    api.patch(`/tasks/${id}`, { status: nuevoEstado })
      .then(() => setTasks(tasks.map((t) => (t.id === id ? { ...t, status: nuevoEstado } : t))));
  };

  // Paso 3: borra la línea de abajo y descomenta agregarTarea() completo.

  // Paso 5: reemplaza agregarTarea por esta versión, que crea la tarea en la
  // API y usa el id real que devuelve el backend (en vez de Date.now()).
  const agregarTarea = (e) => {
    e.preventDefault();
    if (!nuevoTitulo.trim()) return;
    api.post('/tasks', { title: nuevoTitulo, status: 'pendiente' })
      .then((response) => { setTasks([...tasks, response.data.data]); setNuevoTitulo(''); });
  };

  // Paso 5: borra la línea de abajo y descomenta eliminarTarea() completo
  // (borra la tarea en la API y luego la quita del estado local).

  const eliminarTarea = (id) => {
    api.delete(`/tasks/${id}`).then(() => setTasks(tasks.filter((t) => t.id !== id)));
  };

  // Paso 5: borra la línea de abajo y descomenta el useEffect completo, que
  // carga las tareas reales desde la API al aparecer el tablero en pantalla.

  useEffect(() => {
    api.get('/tasks').then((response) => setTasks(response.data.data));
  }, []);

  const pendientes = tasks.filter((t) => t.status === 'pendiente');
  const enProgreso = tasks.filter((t) => t.status === 'en_progreso');
  const completadas = tasks.filter((t) => t.status === 'completada');

  return (
    <div className="board">
      <form onSubmit={agregarTarea}>
        <input
          value={nuevoTitulo}
          onChange={(e) => setNuevoTitulo(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit">Agregar</button>
      </form>
      <Column title="Pendiente" tasks={pendientes} onCambiarEstado={cambiarEstado} onEliminar={eliminarTarea} />
      <Column title="En progreso" tasks={enProgreso} onCambiarEstado={cambiarEstado} onEliminar={eliminarTarea} />
      <Column title="Completada" tasks={completadas} onCambiarEstado={cambiarEstado} onEliminar={eliminarTarea} />
    </div>
  );
}

export default Board;
