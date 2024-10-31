import { useState, useEffect } from 'react';
import Candidate from '../interfaces/Candidate.interface';

const SavedCandidates = () => {
  const [savedCandidates, setSavedCandidates] = useState<Candidate[]>([]);

  useEffect(() => {
    // Fetch saved candidates from local storage or an API
    const candidates = JSON.parse(localStorage.getItem('savedCandidates') || '[]');
    setSavedCandidates(candidates);
  }, []);

  return (
    <div className="saved-candidates">
      <h1>Potential Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No saved candidates</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Name</th>
              <th>Username</th>
              <th>Location</th>
              <th>Email</th>
              <th>Company</th>
              <th>Profile</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map(candidate => (
              <tr key={candidate.id}>
                <td><img src={candidate.avatar_url} alt={candidate.login} width="50" /></td>
                <td>{candidate.name || 'N/A'}</td>
                <td>{candidate.login}</td>
                <td>{candidate.location || 'N/A'}</td>
                <td>{candidate.email || 'N/A'}</td>
                <td>{candidate.company || 'N/A'}</td>
                <td><a href={candidate.html_url} className="nav-link">GitHub Profile</a></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SavedCandidates;