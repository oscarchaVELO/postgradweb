import React, { useState } from 'react';
import axios from 'axios';

function NearbyPage() {
  const [lng, setLng] = useState('');
  const [lat, setLat] = useState('');
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState('');

  const handleSearch = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`/profile/nearby?lng=${lng}&lat=${lat}`);
      setUsers(res.data);
      setMessage('');
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Find Nearby Users</h2>
      <form onSubmit={handleSearch}>
        <input placeholder="Longitude" value={lng} onChange={e => setLng(e.target.value)} required />
        <input placeholder="Latitude" value={lat} onChange={e => setLat(e.target.value)} required />
        <button type="submit">Search</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {users.map(user => (
          <li key={user._id}>{user.name} ({user.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default NearbyPage;
