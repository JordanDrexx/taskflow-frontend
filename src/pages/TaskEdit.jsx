import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';
import Navbar from '../components/Navbar';

function TaskEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [status, setStatus] = useState('pendiente');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get(`/tasks/${id}`)
      .then((response) => {
        const task = response.data.data;
        setTitle(task.title || '');
        setDescription(task.description || '');
        setStatus(task.status || 'pendiente');
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error al cargar la tarea:', err);
        setError('No se pudo cargar la tarea');
        setLoading(false);
      });
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    setSaving(true);
    setError(null);
    api.patch(`/tasks/${id}`, {
      title,
      description,
      status,
    })
      .then(() => {
        navigate(`/tasks/${id}`);
      })
      .catch((err) => {
        console.error('Error al guardar:', err);
        setError(err.response?.data?.message || 'No se pudo guardar la tarea');
        setSaving(false);
      });
  };

  if (loading) {
    return (
      <div className="dashboard-layout">
        <Navbar activePill="Editar Tarea" />
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

  if (error && !title) {
    return (
      <div className="dashboard-layout">
        <Navbar activePill="Editar Tarea" />
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

  return (
    <div className="dashboard-layout">
      <Navbar activePill="Editar Tarea" />

      <main className="dashboard-content">
        <div className="task-page-container">
          <button onClick={() => navigate(`/tasks/${id}`)} className="btn-back">
            <svg className="btn-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
            <span>Volver al detalle</span>
          </button>

          <div className="task-edit task-edit-card">
            <div className="task-edit-header">
              <h1>Editar tarea</h1>
              <p>Actualiza la información de la tarea y guarda tus cambios.</p>
            </div>

            {error && (
              <div className="auth-alert error">
                <svg className="alert-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="task-edit-form">
              <div className="form-group">
                <label htmlFor="task-title">Título de la tarea</label>
                <input
                  id="task-title"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Título descriptivo de la tarea"
                  className="form-input"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="task-desc">Descripción</label>
                <textarea
                  id="task-desc"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Detalles o notas adicionales sobre la tarea..."
                  rows="4"
                  className="form-input form-textarea"
                />
              </div>

              <div className="form-group">
                <label htmlFor="task-status">Estado</label>
                <select
                  id="task-status"
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="form-input form-select"
                >
                  <option value="pendiente">Pendiente</option>
                  <option value="en_progreso">En progreso</option>
                  <option value="completada">Completada</option>
                </select>
              </div>

              <div className="actions task-actions">
                <button type="submit" className="btn-primary" disabled={saving}>
                  {saving ? 'Guardando...' : 'Guardar cambios'}
                </button>
                <button
                  type="button"
                  onClick={() => navigate(`/tasks/${id}`)}
                  className="btn-secondary"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}

export default TaskEdit;