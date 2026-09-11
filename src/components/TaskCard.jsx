import { Link } from 'react-router-dom';

function TaskCard({ id, title, status, onCambiarEstado, onEliminar }) {
  const siguiente = {
    pendiente: 'en_progreso',
    en_progreso: 'completada',
    completada: null,
  };

  // Paso 2: borra el return de abajo y descomenta el bloque completo
  // (título + badge de estado + botón "Avanzar" + botón "Eliminar").


  return (
    <div className="task-card">
      <h4>{title}</h4>
      <span className={`badge ${status}`}>{status}</span>
      {/* Tarea 3: botón "Ver detalle" que redirige a /tasks/:id */}
      <Link to={`/tasks/${id}`} className="btn-detalle">
        Ver detalle
      </Link>
      {siguiente[status] && (
        <button onClick={() => onCambiarEstado(id, siguiente[status])}>
          Avanzar
        </button>
      )}
      <button onClick={() => onEliminar(id)} className="btn-eliminar" title="Eliminar tarea">🗑</button>
    </div>
  );
}

export default TaskCard;
