
import { configureStore, createSlice } from '@reduxjs/toolkit';
import { initialPatients, mockUsers } from './mockData';

const loadFromCache = (key, fallback) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : fallback;
};

const clinicSlice = createSlice({
  name: 'clinic',
  initialState: {
    patients: loadFromCache('medconnect_patients', initialPatients),
    users: loadFromCache('medconnect_users', mockUsers),
    appointments: loadFromCache('medconnect_appointments', []),
    currentUser: null,
  },
  reducers: {
    loginUser: (state, action) => {
      state.currentUser = action.payload;
    },
    logoutUser: (state) => {
      state.currentUser = null;
    },
    registerUser: (state, action) => {
      const { account, patientProfile } = action.payload;
      state.users.push(account);
      if (patientProfile) {
        state.patients.push(patientProfile);
      }
      localStorage.setItem('medconnect_users', JSON.stringify(state.users));
      localStorage.setItem('medconnect_patients', JSON.stringify(state.patients));
    },
    addVisitLog: (state, action) => {
      const { patientId, newVisit } = action.payload;
      const patient = state.patients.find(p => p.id === patientId);
      if (patient) {
        patient.visits.unshift(newVisit); // Create 
        localStorage.setItem('medconnect_patients', JSON.stringify(state.patients));
      }
    },
    updateVisitLog: (state, action) => {
      const { patientId, visitId, diagnosis, notes } = action.payload;
      const patient = state.patients.find(p => p.id === patientId);
      if (patient) {
        const visit = patient.visits.find(v => v.visitId === visitId);
        if (visit) {
          visit.diagnosis = diagnosis; // Update 
          visit.notes = notes;
          localStorage.setItem('medconnect_patients', JSON.stringify(state.patients));
        }
      }
    },
    deleteVisitLog: (state, action) => {
      const { patientId, visitId } = action.payload;
      const patient = state.patients.find(p => p.id === patientId);
      if (patient) {
        patient.visits = patient.visits.filter(v => v.visitId !== visitId); // Delete
        localStorage.setItem('medconnect_patients', JSON.stringify(state.patients));
      }
    },
    bookAppointment: (state, action) => {
      state.appointments.unshift(action.payload);
      localStorage.setItem('medconnect_appointments', JSON.stringify(state.appointments));
    }
  }
});

export const { 
  loginUser, logoutUser, registerUser, 
  addVisitLog, updateVisitLog, deleteVisitLog, 
  bookAppointment 
} = clinicSlice.actions;

export const store = configureStore({
  reducer: { clinic: clinicSlice.reducer }
});
