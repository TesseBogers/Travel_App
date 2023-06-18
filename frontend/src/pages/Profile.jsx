import { useState, useContext } from 'react';
import AuthContext from '../context/AuthContext.jsx';
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";

const Profile = () => {
    const { isAuthenticated } = useContext(AuthContext);
    const [showLogin, setShowLogin] = useState(true); // new state to toggle between Login and SignUp

    return (
        <div className="min-h-screen flex items-center justify-center my-[8rem]">
            <div className="w-full max-w-xs">
                <div className="flex items-center justify-between">
                    <button
                        className={`w-1/2 py-3 px-4 ${showLogin ? 'bg-blue-500 text-white' : 'text-blue-500'}`}
                        onClick={() => setShowLogin(true)}
                    >
                        Login
                    </button>
                    <button
                        className={`w-1/2 py-3 px-4 ${showLogin ? 'text-blue-500' : 'bg-blue-500 text-white'}`}
                        onClick={() => setShowLogin(false)}
                    >
                        Sign Up
                    </button>
                </div>
                {
                    isAuthenticated
                        ? <h1 className="text-center text-xl font-bold my-5">Welcome back!</h1>
                        : showLogin ? <Login /> : <SignUp />
                }
            </div>
        </div>
    );
}

export default Profile;