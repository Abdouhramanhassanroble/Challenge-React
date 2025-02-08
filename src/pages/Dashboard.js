import React from 'react';
import { useParams } from 'react-router-dom';

const Dashboard = () => {

  const { challengeId } = useParams();
  const { quizId } = useParams();

  return (
    <div>
      <h1>Détails du Challenge</h1>
      <p>Challenge ID: {challengeId}</p>
      <p>Crée par : {challengeId.user}</p>
      {/* Ajoute ici les détails du challenge et la liste des participants */}
      <h1>Détails du Quiz</h1>
      sqdsqd
      <p>Quiz ID: {quizId}</p>
    </div>
  );
};

export default Dashboard;