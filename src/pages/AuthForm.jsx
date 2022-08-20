import { useState, useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import AuthContext from '../store/auth-context.js';

export default function AuthForm(props) {
  const navigate = useNavigate();
  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const authCtx = useContext(AuthContext);

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setIsLogin((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    const enteredEmail = emailInputRef.current.value;
    const emailPattern = /^[\w]+@[\w]+\.\w{2,4}/g;
    const isEmailValid = emailPattern.test(enteredEmail);
    const passwordPattern = /^[\w\d]{8,}/g;
    const enteredPassword = passwordInputRef.current.value;
    const isPasswordValid = passwordPattern.test(enteredPassword);

    setIsLoading(true);

    let url;
    if (isLogin) {
      url =
        'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signin';
    } else {
      url =
        'https://5co7shqbsf.execute-api.ap-northeast-2.amazonaws.com/production/auth/signup';
    }

    const options = {
      method: 'POST',
      body: JSON.stringify({
        email: enteredEmail,
        password: enteredPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    try {
      if (!isEmailValid) {
        throw new Error('이메일이 정확하지 않습니다. 반드시 @');
      }

      const res = await fetch(url, options);
      const data = await res.json();
      setIsLoading(false);
      if (res.ok) {
        if (isLogin) {
          authCtx.login(data.access_token);
          navigate('/todo');
        }
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <Layout>
      <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={submitHandler}>
        <div className="rounded-md shadow-sm -space-y-px">
          <h2 className="text-2xl font-bold leading-7 text-gray-900 sm:text-3xl sm:tracking-tight sm:truncate mb-10">
            {isLogin ? 'Login' : 'Sign Up'}
          </h2>
          <div>
            <label htmlFor="email" className="sr-only">
              이메일 주소
            </label>
            <input
              id="email"
              name="email"
              ref={emailInputRef}
              type="email"
              autoComplete="email"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Email address"
            />
          </div>
          <div>
            <label htmlFor="password" className="sr-only">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              ref={passwordInputRef}
              type="password"
              autoComplete="password"
              required
              className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
              placeholder="Password"
            />
          </div>
        </div>
        <div className="text-sm flex justify-end">
          <button
            onClick={switchAuthModeHandler}
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            {isLogin ? '회원가입을 원하시나요?' : '생성한 계정으로 로그인하기'}
          </button>
        </div>
        {!isLoading && (
          <button
            type="submit"
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {isLogin ? '로그인' : '계정 생성하기'}
          </button>
        )}
        {isLoading && (
          <div className="flex justify-center">
            <svg
              aria-hidden="true"
              className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill="currentColor"
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill="currentFill"
              />
            </svg>
            <span className="sr-only">Loading...</span>
          </div>
        )}
      </form>
    </Layout>
  );
}
