// src/App.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from './store';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import PatientList from './pages/PatientList';
import NewVisitForm from './pages/NewVisitForm';
import PatientPortal from './pages/PatientPortal';
import './App.css';

export default function App() {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.clinic.currentUser);
  const patients = useSelector((state) => state.clinic.patients);
  const [currentScreen, setCurrentScreen] = useState('dashboard');

  if (!currentUser) {
    return <Login />;
  }

  if (currentUser.role === 'patient') {
    const matchedProfile = patients.find(p => p.id === currentUser.patientId);
    return (
      <div className="app-container" style={{ flexDirection: 'column' }}>
        <header style={{ background: '#1e293b', color: 'white', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2>🏥 MedConnect Client Hub</h2>
          <button className="nav-button logout-btn" onClick={() => dispatch(logoutUser())} style={{ padding: '8px 16px' }}>Logout</button>
        </header>
        <main className="main-content">
          <PatientPortal currentPatient={matchedProfile} />
        </main>
      </div>
    );
  }

  return (
    <div className="app-container">
      <nav className="sidebar">
        <h2 className="sidebar-title">🏥 MedConnect</h2>
        <p style={{ color: '#cbd5e1', fontSize: '14px' }}>Dr. {currentUser.username}</p>
        <div className="sidebar-nav-list">
          <button onClick={() => setCurrentScreen('dashboard')} className={`nav-button ${currentScreen === 'dashboard' ? 'nav-button-active' : ''}`}>📊 Dashboard</button>
          <button onClick={() => setCurrentScreen('patients')} className={`nav-button ${currentScreen === 'patients' ? 'nav-button-active' : ''}`}>👥 Patients Records</button>
          <button onClick={() => setCurrentScreen('new-visit')} className={`nav-button ${currentScreen === 'new-visit' ? 'nav-button-active' : ''}`}>📝 Log Visit</button>
          <button className="nav-button logout-btn" onClick={() => dispatch(logoutUser())}>Logout</button>
        </div>
      </nav>
      <main className="main-content">
        {currentScreen === 'dashboard' && <Dashboard />}
        {currentScreen === 'patients' && <PatientList />}
        {currentScreen === 'new-visit' && <NewVisitForm goToScreen={setCurrentScreen} />}
      </main>
    </div>
  );
}
