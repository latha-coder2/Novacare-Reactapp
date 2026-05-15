// src/pages/NewVisitForm.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addVisitLog } from '../store';

export default function NewVisitForm({ goToScreen }) {
  const dispatch = useDispatch();
  const patients = useSelector((state) => state.clinic.patients);

  const [selectedPatientId, setSelectedPatientId] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [notes, setNotes] = useState('');
  const [medicines, setMedicines] = useState([{ name: '', dosage: '', time: '' }]);

  const addMedicineRow = () => setMedicines([...medicines, { name: '', dosage: '', time: '' }]);
  const updateMedicineInput = (index, field, value) => {
    const updatedRows = [...medicines];
    updatedRows[index][field] = value;
    setMedicines(updatedRows);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!selectedPatientId) return alert("Select a patient!");

    const newVisit = {
      visitId: String(Date.now()),
      date: new Date().toISOString().split('T')[0],
      diagnosis, symptoms, notes,
      medicines: medicines.filter(m => m.name !== '')
    };

    dispatch(addVisitLog({ patientId: selectedPatientId, newVisit }));
    goToScreen('dashboard');
  };

  return (
    <div className="form-card">
      <h2>Log Patient Visit</h2>
      <form onSubmit={handleFormSubmit}>
        <div className="form-group">
          <select value={selectedPatientId} onChange={(e) => setSelectedPatientId(e.target.value)} required className="form-field">
            <option value="">-- Select Patient --</option>
            {patients.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
          </select>
        </div>
        <div className="form-group"><input type="text" placeholder="Diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)} required className="form-field" /></div>
        <div className="form-group"><textarea placeholder="Symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)} className="form-field" /></div>
        
        <div className="form-group">
          <label className="form-label">Prescription Matrix</label>
          {medicines.map((row, idx) => (
            <div key={idx} className="medicine-row">
              <input type="text" placeholder="Drug Name" value={row.name} onChange={(e) => updateMedicineInput(idx, 'name', e.target.value)} className="form-field" style={{ flex: 2 }} />
              <input type="text" placeholder="Dosage" value={row.dosage} onChange={(e) => updateMedicineInput(idx, 'dosage', e.target.value)} className="form-field" style={{ flex: 1 }} />
              <input type="text" placeholder="Freq" value={row.time} onChange={(e) => updateMedicineInput(idx, 'time', e.target.value)} className="form-field" style={{ flex: 1 }} />
            </div>
          ))}
          <button type="button" onClick={addMedicineRow} className="btn-add">+ Add Pill Row</button>
        </div>

        <div className="form-group"><textarea placeholder="Clinical Advice Notes" value={notes} onChange={(e) => setNotes(e.target.value)} className="form-field" /></div>
        <button type="submit" className="btn-submit">Commit Visit Entry</button>
      </form>
    </div>
  );
}
