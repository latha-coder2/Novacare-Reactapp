// src/pages/PatientPortal.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { bookAppointment } from '../store';

export default function PatientPortal({ currentPatient }) {
  const dispatch = useDispatch();
  const appointments = useSelector((state) => state.clinic.appointments);
  
  const [appDate, setAppDate] = useState('');
  const [reason, setReason] = useState('');

  const myAppointments = appointments.filter(app => app.patientId === currentPatient.id);

  const handleBook = (e) => {
    e.preventDefault();
    dispatch(bookAppointment({
      id: String(Date.now()),
      patientId: currentPatient.id,
      patientName: currentPatient.name,
      date: appDate,
      reason,
      status: "Confirmed"
    }));
    alert("Appointment Booked!");
    setAppDate(''); setReason('');
  };

  return (
    <div className="split-view-container" style={{ maxWidth: '1100px', margin: '0 auto' }}>
      <div className="right-column" style={{ flex: 1.5 }}>
        <h2>Welcome, {currentPatient.name} 👋</h2>
        <p>Blood Group: {currentPatient.bloodGroup} | Phone: {currentPatient.phone}</p>
        <hr style={{ border: '0', borderTop: '1px solid #e2e8f0', margin: '20px 0' }} />
        <h3>Medical History Logs</h3>
        {currentPatient.visits.length === 0 ? <p style={{ color: 'gray' }}>No history records yet.</p> : currentPatient.visits.map((visit, index) => (
          <div key={index} className="visit-history-box">
            <p style={{ color: 'gray', fontSize: '13px' }}>📅 Date: {visit.date}</p>
            <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>
            <p><strong>Notes:</strong> {visit.notes}</p>
            <div className="medicine-tag-box">
              <strong>💊 Prescriptions:</strong>
              {visit.medicines?.map((med, mIdx) => <div key={mIdx}>• {med.name} - {med.dosage} ({med.time})</div>)}
            </div>
          </div>
        ))}
      </div>
      <div className="right-column" style={{ flex: 1 }}>
        <h3>Schedule Consultation</h3>
        <form onSubmit={handleBook}>
          <div className="form-group"><input type="date" className="form-field" value={appDate} onChange={(e) => setAppDate(e.target.value)} required /></div>
          <div className="form-group"><textarea className="form-field" placeholder="Reason..." value={reason} onChange={(e) => setReason(e.target.value)} style={{ height: '70px', resize: 'none' }} /></div>
          <button type="submit" className="btn-submit" style={{ backgroundColor: '#10b981' }}>Book Appointment</button>
        </form>
        <div className="appointment-section">
          <h4>Your Booking Index</h4>
          {myAppointments.length === 0 ? <p style={{ color: 'gray', fontSize: '14px' }}>No active bookings requested.</p> : myAppointments.map(app => (
            <div key={app.id} className="appointment-card"><strong>📅 {app.date}</strong><span>{app.status}</span></div>
          ))}
        </div>
      </div>
    </div>
  );
}
