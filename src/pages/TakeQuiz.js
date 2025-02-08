import React, { useEffect, useState } from "react";
import { db, auth } from "../firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import "../styles/TakeQuiz.css";

const TakeQuiz = () => {
  const { quizId } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [answers, setAnswers] = useState({});
  const [score, setScore] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuiz = async () => {
      try {
        const quizCollection = await getDocs(collection(db, "quizzes"));
        const selectedQuiz = quizCollection.docs
          .map(doc => ({ id: doc.id, ...doc.data() }))
          .find(q => q.id === quizId);

        if (!selectedQuiz) {
          setError("Quiz introuvable.");
          return;
        }

        setQuiz(selectedQuiz);
      } catch (err) {
        setError("Erreur de récupération du quiz.");
        console.error("Firebase Error:", err);
      }
    };

    fetchQuiz();
  }, [quizId]);

  const handleAnswerChange = (questionIndex, selectedOption) => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [questionIndex]: selectedOption,
    }));
  };

  const handleSubmit = async () => {
    if (!quiz) return;

    let userScore = 0;
    quiz.questions.forEach((q, i) => {
      if (answers[i] === q.correctAnswer) userScore++;
    });

    setScore(userScore);

    if (auth.currentUser) {
      try {
        await addDoc(collection(db, "scores"), {
          userId: auth.currentUser.uid,
          quizId: quiz.id,
          score: userScore,
          date: new Date(),
        });
        alert("✅ Score enregistré avec succès !");
      } catch (err) {
        alert("❌ Erreur lors de l'enregistrement du score : " + err.message);
        console.error("Erreur lors de l'enregistrement du score:", err);
      }
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h1 className="quiz-title">
          🎮 {quiz ? quiz.title : "Chargement du Quiz..."}
        </h1>

        {error && <p className="error-message">{error}</p>}

        {score !== null && quiz && (
          <h2 className="score-message">
            🏆 Votre score : {score}/{quiz.questions.length}
          </h2>
        )}

        {quiz ? (
          <div className="quiz-content">
            {quiz.questions.map((q, index) => (
              <div key={index} className="question-card">
                <h2 className="question-text">{q.question}</h2>
                {q.options.map((opt, i) => (
                  <label key={i} className="option-label">
                    <input
                      type="radio"
                      name={`question-${index}`}
                      value={opt}
                      onChange={() => handleAnswerChange(index, opt)}
                    />
                    {opt}
                  </label>
                ))}
              </div>
            ))}

            <button onClick={handleSubmit} className="submit-btn">
              🚀 Soumettre le Quiz
            </button>
          </div>
        ) : (
          <p className="loading-text">Chargement du quiz...</p>
        )}
      </div>
    </div>
  );
};

export default TakeQuiz;
