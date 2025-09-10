import React, { useState } from 'react';
import axios from 'axios';

function SwipePage() {
  const [swiperId, setSwiperId] = useState('');
  const [swipeId, setSwipeId] = useState('');
  const [result, setResult] = useState('');

  const handleSwipe = async e => {
    e.preventDefault();
    try {
      const res = await axios.post(`/match/${swipeId}/swipe`, { swiperId });
      setResult(res.data.match ? 'It’s a match!' : 'Swiped!');
    } catch (err) {
      setResult('Error: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Swipe & Match</h2>
      <form onSubmit={handleSwipe}>
        <input placeholder="Your User ID" value={swiperId} onChange={e => setSwiperId(e.target.value)} required />
        <input placeholder="User ID to Swipe" value={swipeId} onChange={e => setSwipeId(e.target.value)} required />
        <button type="submit">Swipe</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

export default SwipePage;
