import TaskCard from './TaskCard';

function Column({ title, tasks, onCambiarEstado, onEliminar }) {
  // Paso 2: borra el return de abajo y descomenta el bloque completo (el
  // .map() que dibuja un TaskCard por cada tarea).

  return (
    <div className="column">
      <h3>{title}</h3>
      {tasks.map((task) => (
        <TaskCard
          key={task.id}
          id={task.id}
          title={task.title}
          status={task.status}
          onCambiarEstado={onCambiarEstado}
          onEliminar={onEliminar}
        />
      ))}
    </div>
  );
}

export default Column;
