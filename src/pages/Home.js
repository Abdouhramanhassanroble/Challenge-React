import React, { useEffect, useState} from 'react';
import { getDocs, collection } from 'firebase/firestore';
import { auth, db } from '../firebase';
import ChallengeCard from '../components/ChallengeCard';
import QuizzCard from '../components/QuizzCard';
import '../styles/Home.css';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link } from 'react-router-dom';

const Home = () => {
  const [challenges, setChallenges] = useState([]);
  const [quiz, setQuizzes] = useState([]);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const fetchChallenges = async () => {
      const querySnapshot = await getDocs(collection(db, 'challenges'));
      const challengesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setChallenges(challengesData);
    };
    fetchChallenges();
  }, []);

  useEffect(() => {
    const fetchQuizzes = async () => {
      const querySnapshot = await getDocs(collection(db, 'quizzes'));
      const quizzesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQuizzes(quizzesData);
    };
    fetchQuizzes();
  }, []);

  return (
    <div className="home">
      <div className="content">
        <div className="challenge">
          <h1>Liste des Challenges</h1>
          {challenges.map(challenge => (
            <ChallengeCard key={challenge.id} challenge={challenge} />
          ))}
          {user && <li><Link to="/create-challenge">Créer un Challenge</Link></li>}
        </div>
    
        <div>
          <h1>Liste des Quizzes</h1>
          {quiz.map(quiz => (
            <QuizzCard key={quiz.id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  );
  
};

export default Home;