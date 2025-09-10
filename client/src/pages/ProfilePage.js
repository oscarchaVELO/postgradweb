import React, { useState } from 'react';
import axios from 'axios';

const vibrantStyle = {
  background: 'linear-gradient(135deg, #6e8efb 0%, #a777e3 100%)',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'Segoe UI, Arial, sans-serif',
};

const cardStyle = {
  background: '#fff',
  borderRadius: '16px',
  boxShadow: '0 8px 32px 0 rgba(67, 67, 100, 0.2)',
  padding: '2rem',
  maxWidth: '400px',
  width: '100%',
  textAlign: 'center',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  margin: '0.5rem 0',
  borderRadius: '8px',
  border: '1px solid #a777e3',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  background: 'linear-gradient(90deg, #6e8efb 0%, #a777e3 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  marginTop: '1rem',
};

function ProfilePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    interests: '',
    city: '',
    state: '',
    country: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const location = {
        city: form.city,
        state: form.state,
        country: form.country
      };
      const interests = form.interests.split(',').map(i => i.trim());
  await axios.post('http://localhost:5000/profile', {
        name: form.name,
        email: form.email,
        bio: form.bio,
        location,
        interests
      });
      setMessage('Profile created!');
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div style={vibrantStyle}>
      <div style={cardStyle}>
        <h2 style={{ color: '#6e8efb', marginBottom: '1rem' }}>Create Your Profile</h2>
        <form onSubmit={handleSubmit}>
          <input name="name" style={inputStyle} placeholder="Name" value={form.name} onChange={handleChange} required />
          <input name="email" style={inputStyle} placeholder="Email" value={form.email} onChange={handleChange} required />
          <input name="bio" style={inputStyle} placeholder="Bio" value={form.bio} onChange={handleChange} />
          <input name="interests" style={inputStyle} placeholder="Interests (comma separated)" value={form.interests} onChange={handleChange} />
          <input name="city" style={inputStyle} placeholder="City" value={form.city} onChange={handleChange} required />
          <input name="state" style={inputStyle} placeholder="State" value={form.state} onChange={handleChange} required />
          <input name="country" style={inputStyle} placeholder="Country" value={form.country} onChange={handleChange} required />
          <button type="submit" style={buttonStyle}>Create Profile</button>
        </form>
        {message && <p style={{ color: message.includes('Error') ? '#e34a6f' : '#6e8efb', marginTop: '1rem' }}>{message}</p>}
      </div>
    </div>
  );
}

export default ProfilePage;
