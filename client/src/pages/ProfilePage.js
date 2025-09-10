import React, { useState } from 'react';
import axios from 'axios';

function ProfilePage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    bio: '',
    interests: '',
    lng: '',
    lat: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const location = {
        type: 'Point',
        coordinates: [parseFloat(form.lng), parseFloat(form.lat)]
      };
      const interests = form.interests.split(',').map(i => i.trim());
      const res = await axios.post('/profile', {
        name: form.name,
        email: form.email,
        bio: form.bio,
        location,
        interests
      });
      setMessage('Profile created!');
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Create Your Profile</h2>
      <form onSubmit={handleSubmit}>
        <input name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input name="bio" placeholder="Bio" value={form.bio} onChange={handleChange} />
        <input name="interests" placeholder="Interests (comma separated)" value={form.interests} onChange={handleChange} />
        <input name="lng" placeholder="Longitude" value={form.lng} onChange={handleChange} required />
        <input name="lat" placeholder="Latitude" value={form.lat} onChange={handleChange} required />
        <button type="submit">Create Profile</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProfilePage;
