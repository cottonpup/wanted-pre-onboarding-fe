import { useContext } from 'react';
import AuthContext from '../store/auth-context';

export default function Todos() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
  };
  return (
    <>
      <h1>TODOS</h1>
      {isLoggedIn && <button onClick={logoutHandler}>Logout</button>}
    </>
  );
}
