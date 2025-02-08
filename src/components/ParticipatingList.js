import React from 'react';

const ParticipantList = ({ participants }) => {
  return (
    <div className="participant-list">
      <h3>Participants</h3>
      <ul>
        {participants.map((participant, index) => (
          <li key={index}>{participant.name} - Score: {participant.score}</li>
        ))}
      </ul>
    </div>
  );
};

export default ParticipantList;
