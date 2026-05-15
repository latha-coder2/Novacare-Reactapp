// src/pages/PatientList.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateVisitLog, deleteVisitLog } from '../store';

export default function PatientList() {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.clinic.patients);

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedPatientId, setSelectedPatientId] = useState(null);
  
  const [editingVisitId, setEditingVisitId] = useState(null);
  const [editDiagnosis, setEditDiagnosis] = useState('');
  const [editNotes, setEditNotes] = useState('');

  const filteredPatients = patients.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()));
  const selectedPatient = patients.find(p => p.id === selectedPatientId);

  const handleDelete = (visitId) => {
    if (window.confirm("Delete this log permanently?")) {
      dispatch(deleteVisitLog({ patientId: selectedPatientId, visitId }));
    }
  };

  const handleSave = (visitId) => {
    dispatch(updateVisitLog({ patientId: selectedPatientId, visitId, diagnosis: editDiagnosis, notes: editNotes }));
    setEditingVisitId(null);
  };

  return (
    <div className="split-view-container">
      <div className="left-column">
        <h2>Patients Index</h2>
        <input type="text" placeholder="Search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="search-input" />
        {filteredPatients.map(p => (
          <div key={p.id} onClick={() => { setSelectedPatientId(p.id); setEditingVisitId(null); }} className={`patient-row-card ${selectedPatientId === p.id ? 'patient-row-card-selected' : ''}`}>
            <strong>{p.name}</strong><p style={{ margin: '5px 0 0 0', color: 'gray' }}>Age: {p.age}</p>
          </div>
        ))}
      </div>
      <div className="right-column">
        {selectedPatient ? (
          <div>
            <h2>{selectedPatient.name}'s History Chart</h2>
            {selectedPatient.visits.length === 0 ? <p style={{ color: 'gray' }}>No medical history logs found.</p> : selectedPatient.visits.map(visit => (
              <div key={visit.visitId} className="visit-history-box">
                {editingVisitId === visit.visitId ? (
                  <div>
                    <input type="text" className="edit-input-field" value={editDiagnosis} onChange={(e) => setEditDiagnosis(e.target.value)} />
                    <textarea className="edit-input-field" value={editNotes} onChange={(e) => setEditNotes(e.target.value)} />
                    <div className="action-btn-row" style={{ marginTop: '10px' }}>
                      <button className="btn-edit-action" style={{ backgroundColor: '#10b981', color: 'white' }} onClick={() => handleSave(visit.visitId)}>Save</button>
                      <button className="btn-edit-action" onClick={() => setEditingVisitId(null)}>Cancel</button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <p style={{ margin: '0 0 5px 0', color: 'gray', fontSize: '13px' }}>📅 Date: {visit.date}</p>
                    <p><strong>Diagnosis:</strong> {visit.diagnosis}</p>
                    <p><strong>Notes:</strong> {visit.notes}</p>
                    <div className="medicine-tag-box">
                      <strong>💊 Medicines:</strong>
                      {visit.medicines?.map((med, i) => <div key={i} style={{ fontSize: '13px' }}>• {med.name} - {med.dosage} ({med.time})</div>)}
                    </div>
                    <div className="action-btn-row">
                      <button className="btn-edit-action" onClick={() => { setEditingVisitId(visit.visitId); setEditDiagnosis(visit.diagnosis); setEditNotes(visit.notes); }}>✏️ Edit</button>
                      <button className="btn-delete-action" onClick={() => handleDelete(visit.visitId)}>🗑️ Delete</button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : <p style={{ textAlign: 'center', color: 'gray', marginTop: '100px' }}>Select a patient from the list.</p>}
      </div>
    </div>
  );
}
