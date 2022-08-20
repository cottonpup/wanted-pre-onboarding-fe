import { useContext, useRef, useState } from 'react';
import Layout from '../components/Layout';
import TodoListItem from '../components/TodoListItem';
import AuthContext from '../store/auth-context';
import { v4 as uuid } from 'uuid';

export default function Todos() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
  };
  const [todos, setTodos] = useState([]);
  const enteredNewText = useRef();

  const createNewTodo = (e) => {
    e.preventDefault();
    setTodos([
      ...todos,
      {
        id: uuid(),
        text: enteredNewText.current.value,
        checked: false,
      },
    ]);
    enteredNewText.current.value = '';
  };
  const removeTodoItem = (e, selectedItem) => {
    e.preventDefault();
    const filteredTodoList = todos.filter((todo) => todo.id !== selectedItem.id);
    setTodos(filteredTodoList);
  };

  return (
    <Layout>
      <div className="bg-white">
        <div className="relative z-10 flex items-baseline justify-between pb-6 border-b border-gray-200">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Todo List</h1>
          {isLoggedIn && (
            <button
              className="group relative w-20 flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={logoutHandler}
            >
              Logout
            </button>
          )}
        </div>

        <form className="hidden lg:block">
          <div className="border-b border-gray-200 py-6 space-y-4">
            {todos &&
              todos.map((todo) => (
                <TodoListItem key={todo.id} item={todo} removeTodoItem={removeTodoItem} />
              ))}
            <div className="form-control">
              <div className="input-group">
                <input
                  type="text"
                  placeholder="내용을 입력하세요."
                  className="input input-bordered w-full"
                  ref={enteredNewText}
                />
                <button className="btn" onClick={createNewTodo}>
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
