import React, { useState } from 'react';
import axios from 'axios';

function MatchesPage() {
  const [userId, setUserId] = useState('');
  const [matches, setMatches] = useState([]);
  const [message, setMessage] = useState('');

  const handleGetMatches = async e => {
    e.preventDefault();
    try {
      const res = await axios.get(`/match/${userId}/matches`);
      setMatches(res.data);
      setMessage('');
    } catch (err) {
      setMessage('Error: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Your One-on-One Matches</h2>
      <form onSubmit={handleGetMatches}>
        <input placeholder="Your User ID" value={userId} onChange={e => setUserId(e.target.value)} required />
        <button type="submit">Get Matches</button>
      </form>
      {message && <p>{message}</p>}
      <ul>
        {matches.map(match => (
          <li key={match._id}>{match.name} ({match.email})</li>
        ))}
      </ul>
    </div>
  );
}

export default MatchesPage;
