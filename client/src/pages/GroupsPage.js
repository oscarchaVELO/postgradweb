import React, { useState } from 'react';
import axios from 'axios';

function GroupsPage() {
  const [creatorId, setCreatorId] = useState('');
  const [memberIds, setMemberIds] = useState('');
  const [name, setName] = useState('');
  const [result, setResult] = useState('');

  const handleCreateGroup = async e => {
    e.preventDefault();
    try {
      const members = memberIds.split(',').map(id => id.trim());
      const res = await axios.post(`/match/${creatorId}/groups`, { memberIds: members, name });
      setResult('Group created: ' + res.data.name);
    } catch (err) {
      setResult('Error: ' + err.response?.data?.error || err.message);
    }
  };

  return (
    <div>
      <h2>Create Group from Matches</h2>
      <form onSubmit={handleCreateGroup}>
        <input placeholder="Your User ID" value={creatorId} onChange={e => setCreatorId(e.target.value)} required />
        <input placeholder="Group Name" value={name} onChange={e => setName(e.target.value)} required />
        <input placeholder="Member IDs (comma separated)" value={memberIds} onChange={e => setMemberIds(e.target.value)} required />
        <button type="submit">Create Group</button>
      </form>
      {result && <p>{result}</p>}
    </div>
  );
}

export default GroupsPage;
