import React, { useState } from "react";
import { auth, db } from "../firebase"; 
import { addDoc, collection } from "firebase/firestore";
import { motion } from "framer-motion";

const CreateChallenge = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const user = auth.currentUser;
    if (!user) {
      setError("Vous devez être connecté pour créer un challenge.");
      return;
    }
  
    try {
      await addDoc(collection(db, "challenges"), {
        title,
        description,
        createdAt: new Date(),
        userId: user.uid
      });
  
      setTitle("");
      setDescription("");
      alert("🚀 Challenge créé avec succès !");
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error("Erreur Firestore:", err);
    }
  

    if (!title || !description) {
      setError("Veuillez remplir tous les champs.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      await addDoc(collection(db, "challenges"), {
        title,
        description,
        createdAt: new Date()
      });

      setTitle("");
      setDescription("");
      alert("🚀 Challenge créé avec succès !");
    } catch (err) {
      setError("Une erreur est survenue. Veuillez réessayer.");
      console.error("Erreur Firestore:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-black p-4">
      <motion.h1
        className="text-4xl font-bold text-cyan-400 neon-text mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Créer un Challenge
      </motion.h1>

      <motion.form
        onSubmit={handleSubmit}
        className="bg-white/10 p-8 rounded-lg shadow-lg backdrop-blur-md border border-white/20 w-full max-w-md transition-transform hover:scale-105"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        {error && (
          <motion.p
            className="text-red-500 text-center mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            ⚠️ {error}
          </motion.p>
        )}

        <input
          type="text"
          placeholder="Titre du Challenge"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-3 mb-4 text-white bg-white/20 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-3 mb-4 text-white bg-white/20 border border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-400 transition"
          rows="4"
        />

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-cyan-400 to-blue-500 text-white font-bold rounded-lg shadow-md transition-all hover:scale-105 hover:shadow-cyan-400/50 flex items-center justify-center"
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin h-5 w-5 border-t-2 border-white rounded-full"></div>
          ) : (
            "Lancer le Challenge 🚀"
          )}
        </button>
      </motion.form>
    </div>
  );
};

export default CreateChallenge;
