import Candidate from '../interfaces/Candidate.interface';
import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';

const CandidateSearch = () => {
  const [candidate, setCandidate] = useState<Candidate | null>(null);
  const [potentialCandidates, setPotentialCandidates] = useState<Candidate[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchCandidate = async () => {
      const result = await searchGithub();
      console.log('Fetched candidates:', result); // Log fetched data
      if (result.length > 0) {
        setCandidate(result[0]);
      }
    };

    fetchCandidate();
  }, []);

  useEffect(() => {
    if (currentIndex > 0) {
      const fetchCandidate = async () => {
        const result = await searchGithub();
        console.log('Fetched candidates on index change:', result); // Log fetched data on index change
        if (result.length > 0) {
          setCandidate(result[0]);
        }
      };

      fetchCandidate();
    }
  }, [currentIndex]);

  const handleSaveCandidate = () => {
    if (candidate) {
      console.log('Saving candidate:', candidate); // Log candidate being saved
      setPotentialCandidates([...potentialCandidates, candidate]);
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleSkipCandidate = () => {
    console.log('Skipping candidate'); // Log skipping action
    setCurrentIndex(currentIndex + 1);
  };

  if (!candidate) {
    return <h1>No more candidates available</h1>;
  }

  return (
    <div>
      <h1>CandidateSearch</h1>
      <div>
        <img src={candidate.avatar_url} alt={candidate.login} />
        <h2>{candidate.name || candidate.login}</h2>
        <p>Username: {candidate.login}</p>
        <p>Location: {candidate.location}</p>
        <p>Email: {candidate.email}</p>
        <p>Company: {candidate.company}</p>
        <a href={candidate.html_url}>GitHub Profile</a>
      </div>
      <button onClick={handleSaveCandidate}>+</button>
      <button onClick={handleSkipCandidate}>-</button>
    </div>
  );
};

export default CandidateSearch;