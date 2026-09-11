import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

function formatDate(dateString) {
  if (!dateString) return 'No especificada';
  try {
    const d = new Date(dateString);
    if (isNaN(d.getTime())) return dateString;
    return new Intl.DateTimeFormat('es-ES', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(d);
  } catch {
    return dateString;
  }
}

function TaskDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/tasks/${id}`)
      .then((response) => {
        setTask(response.data.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar la tarea:', err);
        setError('No se pudo cargar la tarea');
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Navbar activePill="Detalle de Tarea" />
        <main className="dashboard-content">
          <div className="task-page-container">
            <div className="task-state-card loading-card">
              <div className="spinner"></div>
              <p>Cargando información de la tarea...</p>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-layout">
        <Navbar activePill="Detalle de Tarea" />
        <main className="dashboard-content">
          <div className="task-page-container">
            <div className="task-state-card">
              <div className="auth-alert error">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
              <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                Volver al tablero
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  if (!task) {
    return (
      <div className="dashboard-layout">
        <Navbar activePill="Detalle de Tarea" />
        <main className="dashboard-content">
          <div className="task-page-container">
            <div className="task-state-card">
              <p>Tarea no encontrada</p>
              <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                Volver al tablero
              </button>
            </div>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <Navbar activePill="Detalle de Tarea" />

      <main className="dashboard-content">
        <div className="task-page-container">
          <button onClick={() => navigate('/dashboard')} className="btn-back">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Volver al tablero</span>
          </button>

          <div className="task-detail task-detail-card">
            <div className="task-detail-top">
              <span className={`badge ${task.status}`}>
                {task.status ? task.status.replace('_', ' ') : 'pendiente'}
              </span>
              <span className="task-id-badge">ID #{task.id}</span>
            </div>

            <h1 className="task-detail-title">{task.title}</h1>

            <div className="task-detail-section">
              <h3 className="task-section-label">Descripción</h3>
              <p className={`task-detail-description ${!task.description ? 'empty' : ''}`}>
                {task.description || 'Sin descripción proporcionada.'}
              </p>
            </div>

            <div className="task-meta-grid">
              <div className="task-meta-item">
                <span className="meta-label">Estado actual</span>
                <span className="meta-value">
                  {task.status === 'pendiente' && 'Pendiente'}
                  {task.status === 'en_progreso' && 'En progreso'}
                  {task.status === 'completada' && 'Completada'}
                  {!['pendiente', 'en_progreso', 'completada'].includes(task.status) && task.status}
                </span>
              </div>
              <div className="task-meta-item">
                <span className="meta-label">Fecha de creación</span>
                <span className="meta-value">{formatDate(task.created_at)}</span>
              </div>
              {task.updated_at && task.updated_at !== task.created_at && (
                <div className="task-meta-item">
                  <span className="meta-label">Última actualización</span>
                  <span className="meta-value">{formatDate(task.updated_at)}</span>
                </div>
              )}
            </div>

            <div className="actions task-actions">
              <Link to={`/tasks/${task.id}/edit`} className="btn-primary btn-editar">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
                <span>Editar tarea</span>
              </Link>
              <button onClick={() => navigate('/dashboard')} className="btn-secondary">
                <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
                <span>Volver al tablero</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TaskDetail;