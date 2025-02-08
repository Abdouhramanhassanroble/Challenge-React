import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome, FaPlus, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa'; // Exemple avec react-icons
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const [user] = useAuthState(auth);

  return (
    <div className="sidebar">
      <div className="logo">
        <Link to="/">
          <img src="/1.png" alt="Logo" />
        </Link>
      </div>
      <ul>
        <li>
          <Link to="/">
            <span className="icon"><FaHome /></span>
            <span className="text">Accueil</span>
          </Link>
        </li>
        {user && (
          <li>
            <Link to="/create-challenge">
              <span className="icon"><FaPlus /></span>
              <span className="text">Créer un Challenge</span>
            </Link>
          </li>
        )}
         {user && (
          <li>
            <Link to="/create-quiz">
              <span className="icon"><FaPlus /></span>
              <span className="text">Créer un Quiz</span>
            </Link>
          </li>
        )}
         {!user ? (
            <li>
              <Link to="/login">
                <span className="icon"><FaSignInAlt /></span>
                <span className="text">Connexion</span>
              </Link>
            </li>
          ) : (
            <li className="logout-container">
              <button type="button" onClick={() => auth.signOut()}>
                <span className="icon"><FaSignOutAlt /></span>
              </button>
            </li>
          )}

      </ul>
    </div>
  );
};

export default Sidebar;
