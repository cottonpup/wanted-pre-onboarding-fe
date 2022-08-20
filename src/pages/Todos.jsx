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
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 hover:bg-slate-100 rounded-sm">
                <div className="flex items-center">
                  <input
                    id="filter-size-3"
                    value="18l"
                    type="checkbox"
                    className="h-4 w-4 border-gray-300 rounded text-indigo-600 focus:ring-indigo-500"
                  />
                  <label
                    htmlFor="filter-size-3"
                    className="ml-3 text-sm text-gray-600 line-through"
                  >
                    18L
                  </label>
                </div>
                <div className="flex items-center">
                  <button className="flex items-center">
                    <svg
                      className="inline-block h-4 w-4 fill-[#9ca3af] hover:fill-indigo-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                    >
                      <path d="M20.71,7.04C21.1,6.65 21.1,6 20.71,5.63L18.37,3.29C18,2.9 17.35,2.9 16.96,3.29L15.12,5.12L18.87,8.87M3,17.25V21H6.75L17.81,9.93L14.06,6.18L3,17.25Z"></path>
                    </svg>
                  </button>
                  <button className="flex items-center">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-5 w-5 stroke-[#9ca3af] hover:stroke-indigo-600"
                      viewBox="0 0 24 24"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="3"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="form-control">
                <div className="input-group">
                  <input
                    type="text"
                    placeholder="내용을 입력하세요."
                    className="input input-bordered w-full"
                  />
                  <button className="btn">
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
          </div>
        </form>
      </div>
    </Layout>
  );
}
