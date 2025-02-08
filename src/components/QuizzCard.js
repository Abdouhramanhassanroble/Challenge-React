import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link } from "react-router-dom";
import { auth } from "../firebase";

const QuizCard = ({ quiz }) => {
  const [user] = useAuthState(auth);

  return (
    <div className="quiz-card border p-4 rounded-lg shadow-lg bg-white">
      <h3 className="text-xl font-bold">{quiz.title}</h3>
      <p className="text-gray-600">{quiz.description}</p>

      {user && (
        <Link 
          to={`/take-quiz/${quiz.id}`} 
          className="text-blue-500 font-bold mt-2 inline-block"
        >
          🎮 Jouer au Quiz
        </Link>
      )}
    </div>
  );
};

export default QuizCard;
