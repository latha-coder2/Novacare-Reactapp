// src/pages/Dashboard.jsx
import { useSelector } from 'react-redux';

export default function Dashboard() {
  const patients = useSelector((state) => state.clinic.patients);
  const appointments = useSelector((state) => state.clinic.appointments);

  const totalPatients = patients.length;
  let totalVisitsCount = 0;
  patients.forEach(p => { totalVisitsCount += p.visits.length; });

  return (
    <div>
      <h1>Welcome Doctor 👋</h1>
      <div className="card-row">
        <div className="metrics-card"><h3 className="card-title">Total Patients</h3><p className="card-number">{totalPatients}</p></div>
        <div className="metrics-card" style={{ borderTopColor: '#10b981' }}><h3 className="card-title">Visits Logged</h3><p className="card-number" style={{ color: '#10b981' }}>{totalVisitsCount}</p></div>
      </div>
      <div className="right-column" style={{ marginTop: '30px' }}>
        <h3>Patient Appointment Line</h3>
        {appointments.length === 0 ? <p style={{ color: 'gray' }}>No active bookings requested.</p> : (
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px', marginTop: '15px' }}>
            {appointments.map(app => (
              <div key={app.id} className="visit-history-box" style={{ margin: 0, borderLeft: '5px solid #0284c7' }}>
                <strong>👤 {app.patientName}</strong> <span style={{ float: 'right' }}>🗓️ {app.date}</span>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>Reason: {app.reason}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
