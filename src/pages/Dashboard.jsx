import Navbar from '../components/Navbar';
import Board from '../components/Board';

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Navbar activePill="Tablero Kanban" />
      <main className="dashboard-content">
        <Board />
      </main>
    </div>
  );
}

export default Dashboard;
