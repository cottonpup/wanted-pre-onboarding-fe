import { Routes, Route, Navigate } from 'react-router-dom';
import AuthForm from './pages/AuthForm';
import Todos from './pages/Todos';
import './App.css';
import AuthContext from './store/auth-context';
import { useContext } from 'react';

function App() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={!isLoggedIn ? <AuthForm /> : <Navigate to="/todo" />} />
        <Route path="/todo" element={isLoggedIn ? <Todos /> : <Navigate to="/" />} />
      </Routes>
    </div>
  );
}

export default App;
