// src/pages/Login.jsx
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { loginUser, registerUser } from '../store';

export default function Login() {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.clinic.users);

  const [isRegisterMode, setIsRegisterMode] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('patient');
  
  const [fullName, setFullName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [bloodGroup, setBloodGroup] = useState('O+');
  const [phone, setPhone] = useState('');

  const handleAuthSubmit = (e) => {
    e.preventDefault();

    if (isRegisterMode) {
      const userExists = users.some(u => u.username.toLowerCase() === username.toLowerCase());
      if (userExists) return alert("Username already taken!");

      let newUserId = String(Date.now());
      let account = { username, password, role };
      let patientProfile = null;

      if (role === 'patient') {
        patientProfile = { id: newUserId, name: fullName, age: parseInt(age), gender, bloodGroup, phone, visits: [] };
        account.patientId = newUserId;
      }

      dispatch(registerUser({ account, patientProfile }));
      alert("Registration Successful!");
      setIsRegisterMode(false);
    } else {
      const foundUser = users.find(u => u.username === username && u.password === password);
      if (foundUser) {
        dispatch(loginUser(foundUser));
      } else {
        alert("Invalid Details!");
      }
    }
  };

  return (
    <div className="login-bg">
      <div className="login-box" style={{ maxWidth: isRegisterMode && role === 'patient' ? '500px' : '400px' }}>
        <h2 className="login-title">🏥 MedConnect</h2>
        <form onSubmit={handleAuthSubmit}>
          <div className="form-group"><label className="form-label">Username</label><input type="text" className="form-field" value={username} onChange={(e) => setUsername(e.target.value)} required /></div>
          <div className="form-group"><label className="form-label">Password</label><input type="password" className="form-field" value={password} onChange={(e) => setPassword(e.target.value)} required /></div>
          {isRegisterMode && (
            <div className="form-group">
              <label className="form-label">Register As</label>
              <select className="form-field" value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </div>
          )}
          {isRegisterMode && role === 'patient' && (
            <div style={{ background: '#f8fafc', padding: '15px', borderRadius: '8px', marginBottom: '15px' }}>
              <div className="form-group"><label className="form-label">Full Name</label><input type="text" className="form-field" value={fullName} onChange={(e) => setFullName(e.target.value)} required /></div>
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
                <input type="number" placeholder="Age" className="form-field" value={age} onChange={(e) => setAge(e.target.value)} required />
                <select className="form-field" value={gender} onChange={(e) => setGender(e.target.value)}><option value="Male">Male</option><option value="Female">Female</option></select>
              </div>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Blood Group" className="form-field" value={bloodGroup} onChange={(e) => setBloodGroup(e.target.value)} required />
                <input type="text" placeholder="Phone" className="form-field" value={phone} onChange={(e) => setPhone(e.target.value)} required />
              </div>
            </div>
          )}
          <button type="submit" className="btn-submit">{isRegisterMode ? 'Register Account' : 'Login'}</button>
        </form>
        <p className="switch-auth-text">{isRegisterMode ? "Have an account? " : "New here? "}<span className="switch-auth-link" onClick={() => setIsRegisterMode(!isRegisterMode)}>{isRegisterMode ? 'Login' : 'Create Account'}</span></p>
      </div>
    </div>
  );
}
