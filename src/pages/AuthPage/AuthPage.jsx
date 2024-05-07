import { useState } from 'react';
import SignUpForm from '../../components/SignUpForm/SignUpForm';
import LoginForm from '../../components/LoginForm/LoginForm';
import MainImage from '../../StockIllustrations/vecteezy_set-of-cat-and-dogs-pets_11143703.jpg'

export default function AuthPage({ setUser }) {
  const [showSignUp, setShowSignUp] = useState(false);
  
  return (
    <main className="min-h-screen flex flex-col justify-center items-center">
      <div className="flex">
        <div className="mr-10 flex flex-col justify-center items-center" style={{ marginLeft: '-50px' }}>
          <img src={MainImage} alt="" class="authimg" />
          <h1 className="text-3xl font-bold mb-3 mr-8">Welcome to Byte Buddies</h1>
          <p className="text-center mr-8">Experience the joy of caring for virtual pets while <br/>learning essential pet care practices with our interactive game.</p>
        </div>
        <div>
          <button 
            onClick={() => setShowSignUp(!showSignUp)} 
            className="px-4 py-2 rounded-md mb-4"
          >
            {showSignUp ? 'Already have an account? Log In' : 'Don\'t have an account? Sign Up!'}
          </button>
          { showSignUp ? <SignUpForm setUser={setUser} /> : <LoginForm setUser={setUser} /> }
        </div>
      </div>
    </main>
  );
}
