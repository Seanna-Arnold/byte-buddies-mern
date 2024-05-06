import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  
  return (
    <main className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-3xl font-bold mb-8">Welcome to AuthPage</h1>
      <button 
        onClick={() => setShowSignUp(!showSignUp)} 
        className="bg-purple-500 text-white px-4 py-2 rounded-md shadow-md mb-4 hover:bg-purple-600"
      >
        {showSignUp ? 'Log In' : 'Sign Up'}
      </button>
      { showSignUp ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} /> }
    </main>
  );
}
