import React from 'react';

const ChallengeCard = ({ challenge }) => {
  return (
    <div className="challenge-card">
      <h3>{challenge.title}</h3>
      <p>{challenge.description}</p>
    </div>
  );
};

export default ChallengeCard;
