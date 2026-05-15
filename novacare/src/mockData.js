// src/mockData.js
export const mockUsers = [
  { username: "doctor1", password: "123", role: "doctor" },
  { username: "vijay", password: "123", role: "patient", patientId: "1" },
  { username: "anjali", password: "123", role: "patient", patientId: "2" }
];

export const initialPatients = [
  {
    id: "1",
    name: "Vijay Kumar",
    age: 35,
    gender: "Male",
    bloodGroup: "O+",
    phone: "9876543210",
    visits: [
      {
        visitId: "v_init_1",
        date: "2026-05-15",
        diagnosis: "Fever and Cold",
        symptoms: "High body temperature, cough for 3 days",
        notes: "Take rest for 3 days. Drink plenty of warm water.",
        medicines: [{ name: "Paracetamol", dosage: "650mg", time: "Morning and Night" }]
      }
    ]
  },
  {
    id: "2",
    name: "Anjali Devi",
    age: 28,
    gender: "Female",
    bloodGroup: "A+",
    phone: "9123456789",
    visits: []
  }
];
