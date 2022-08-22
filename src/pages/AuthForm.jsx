import { useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout.jsx';
import Spinner from '../components/Spinner.jsx';
import AuthContext from '../store/auth-context.js';

export default function AuthForm() {
  const navigate = useNavigate();
  const authCtx = useContext(AuthContext);
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isInputValid, setIsInputValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [enteredEmail, setEnteredEmail] = useState('');
  const [enteredPassword, setEnteredPassword] = useState('');

  useEffect(() => {
    const emailPattern = /^[\w]+@[\w]+\.\w{2,4}/g;
    const passwordPattern = /^[\w\d]{8,}/g;
    const validation =
      emailPattern.test(enteredEmail) && passwordPattern.test(enteredPassword);
    setIsInputValid(validation);
  }, [enteredEmail, enteredPassword]);

  const switchAuthModeHandler = (event) => {
    event.preventDefault();
    setIsLoginMode((prevState) => !prevState);
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    let url;
    if (isLoginMode) {
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
      setIsLoading(false);
      const res = await fetch(url, options);
      const data = await res.json();
      if (res.ok) {
        if (isLoginMode) {
          authCtx.login(data.access_token);
          navigate('/todo');
        } else {
          alert('계정 생성이 완료되었습니다.');
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
            {isLoginMode ? 'Login' : 'Sign Up'}
          </h2>
          <div>
            <label htmlFor="email" className="sr-only">
              이메일 주소
            </label>
            <input
              id="email"
              name="email"
              onChange={(e) => setEnteredEmail(e.target.value)}
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
              onChange={(e) => setEnteredPassword(e.target.value)}
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
            {isLoginMode ? '회원가입을 원하시나요?' : '생성한 계정으로 로그인하기'}
          </button>
        </div>
        {!isLoading && (
          <button
            type="submit"
            disabled={!isInputValid}
            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-slate-50 disabled:text-slate-500 disabled:border-slate-200 disabled:shadow-none"
          >
            {isLoginMode ? '로그인' : '계정 생성하기'}
          </button>
        )}
        {isLoading && <Spinner />}
      </form>
    </Layout>
  );
}
