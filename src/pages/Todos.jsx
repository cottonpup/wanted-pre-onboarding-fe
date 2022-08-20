import { useContext } from 'react';
import Layout from '../components/Layout';
import AuthContext from '../store/auth-context';

export default function Todos() {
  const authCtx = useContext(AuthContext);
  const isLoggedIn = authCtx.isLoggedIn;
  const logoutHandler = () => {
    authCtx.logout();
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
          <div className="border-b border-gray-200 py-6">
            <h3 className="-my-3 flow-root">
              <button
                type="button"
                className="py-3 bg-white w-full flex items-center justify-between text-sm text-gray-400 hover:text-gray-500"
                aria-controls="filter-section-2"
                aria-expanded="false"
              >
                <span className="font-medium text-gray-900"> Size </span>
                <span className="ml-6 flex items-center">
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

                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
              </button>
            </h3>

            <div className="pt-6" id="filter-section-2">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="filter-size-0"
                    value="2l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="filter-size-0" className="ml-3 text-sm text-gray-600">
                    2L
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-size-1"
                    value="6l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="filter-size-1" className="ml-3 text-sm text-gray-600">
                    6L
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-size-2"
                    value="12l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="filter-size-2" className="ml-3 text-sm text-gray-600">
                    12L
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-size-3"
                    value="18l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="filter-size-3" className="ml-3 text-sm text-gray-600">
                    18L
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-size-4"
                    value="20l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="filter-size-4" className="ml-3 text-sm text-gray-600">
                    20L
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="filter-size-5"
                    value="40l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label htmlFor="filter-size-5" className="ml-3 text-sm text-gray-600">
                    40L
                  </label>
                </div>

              </div>
            </div>
          </div>
        </form>
      </div>
    </Layout>
  );
}
