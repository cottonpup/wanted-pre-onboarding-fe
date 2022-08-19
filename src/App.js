import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import AuthForm from './pages/AuthForm';
import Todos from './pages/Todos';
import './App.css';

function App() {
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    window.localStorage.setItem('access_token', token);
    const savedToken = window.localStorage.getItem('access_token');
    console.log(savedToken);
    if (savedToken) {
      navigate('/todo');
    } else {
      navigate('/');
    }
  }, [token, navigate]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<AuthForm handleAuthToken={setToken} />} />
        <Route path="/todo" element={<Todos />} />
      </Routes>
    </div>
  );
}

export default App;
