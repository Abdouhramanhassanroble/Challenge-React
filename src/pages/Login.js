import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import '../styles/Login.css';
import { useNavigate } from 'react-router-dom'; // Import du hook useNavigate

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Initialisation de useNavigate

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log('Connexion réussie !');
      window.alert('Connexion réussie !');
      navigate('/'); // Redirection vers la page souhaitée
    } catch (error) {
      console.error('Erreur de connexion :', error.message);
      window.alert('Erreur de connexion : ' + error.message); // Affiche un message d'erreur
    }
  };

  return (
    <div className="login">
      <form onSubmit={handleLogin}>
        <img src="/1.png" alt="Logo" />
        <h3>Se connecter</h3>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Se connecter</button>
      </form>
    </div>
  );
};

export default Login;
