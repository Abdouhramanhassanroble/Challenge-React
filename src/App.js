import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import CreateChallenge from './pages/CreateChallenge';
import CreateQuiz from './pages/CreateQuiz';
import Sidebar from './components/Sidebar';
import TakeQuiz from './pages/TakeQuiz';
import './styles/App.css';

function App() {
  return (
    <Router>
      <Sidebar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard/:challengeId" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/create-challenge" element={<CreateChallenge />} />
        <Route path="/create-quiz" element={<CreateQuiz />} />
        <Route path="/take-quiz/:quizId" element={<TakeQuiz />} />
      </Routes>
    </Router>
  );
}

export default App;
