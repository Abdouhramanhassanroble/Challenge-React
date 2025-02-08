import React, { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";

const CreateQuiz = () => {
  const [title, setTitle] = useState("");
  const [questions, setQuestions] = useState([]);
  const [questionText, setQuestionText] = useState("");
  const [options, setOptions] = useState(["", "", "", ""]);
  const [correctAnswer, setCorrectAnswer] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const addQuestion = () => {
    if (!questionText || options.includes("") || !correctAnswer) {
      setError("Veuillez remplir tous les champs.");
      return;
    }
    setQuestions([...questions, { question: questionText, options, correctAnswer }]);
    setQuestionText("");
    setOptions(["", "", "", ""]);
    setCorrectAnswer("");
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || questions.length === 0) {
      setError("Le titre et au moins une question sont requis.");
      return;
    }
    
    try {
      await addDoc(collection(db, "quizzes"), { title, questions });
      console.log("Quiz créé avec succès !");
      setSuccess("Quiz créé avec succès !");
      setTitle("");
      setQuestions([]);
    } catch (err) {
      console.error("Erreur Firestore:", err);
      setError("Erreur lors de la création.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Créer un Quiz</h1>
      {error && <p className="text-red-500">{error}</p>}
      {success && <p className="text-green-500">{success}</p>}
      <input 
        type="text" placeholder="Titre du quiz"
        value={title} onChange={(e) => setTitle(e.target.value)}
        className="border p-2 mb-4 w-full"
      />

      <h2 className="text-xl font-bold">Ajouter une question</h2>
      <input 
        type="text" placeholder="Question"
        value={questionText} onChange={(e) => setQuestionText(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      {options.map((opt, i) => (
        <input 
          key={i} type="text" placeholder={`Option ${i + 1}`}
          value={opt} onChange={(e) => {
            let newOptions = [...options];
            newOptions[i] = e.target.value;
            setOptions(newOptions);
          }}
          className="border p-2 mb-2 w-full"
        />
      ))}
      <select 
        onChange={(e) => setCorrectAnswer(e.target.value)}
        value={correctAnswer}
        className="border p-2 mb-4 w-full"
      >
        <option value="">Sélectionner la bonne réponse</option>
        {options.map((opt, i) => (
          <option key={i} value={opt}>{opt}</option>
        ))}
      </select>

      <button 
        onClick={addQuestion} 
        className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
      >
        Ajouter la question
      </button>

      <button 
        onClick={handleSubmit} 
        className="bg-green-500 text-white px-4 py-2 rounded"
      >
        Enregistrer le Quiz
      </button>

      <h3 className="mt-4">Aperçu des questions :</h3>
      <ul>
        {questions.map((q, index) => (
          <li key={index}>{q.question} ✅ {q.correctAnswer}</li>
        ))}
      </ul>
    </div>
  );
};

export default CreateQuiz;
