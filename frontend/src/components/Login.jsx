import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import axios from "../api/axios.js";

const LOGIN_ENDPOINT = "/auth";

const Login = () => {
    const { setAuth } = useContext(AuthContext);
    const usernameInputRef = useRef();
    const errorRef = useRef();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        usernameInputRef.current && usernameInputRef.current.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [username, password]);

    const handleLogin = async (username, password) => {
        const response = await axios.post(LOGIN_ENDPOINT, JSON.stringify({ username, password }), {
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        const { accessToken, roles } = response?.data;
        setAuth({ username, password, roles, accessToken });

        setUsername('');
        setPassword('');
        setSuccess(true);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            await handleLogin(username, password);
        } catch (error) {
            if (!error?.response) {
                setError('Network Error');
            } else if (error?.response?.status === 400) {
                setError('Missing Username or Password');
            } else if (error?.response?.status === 401) {
                setError('Unauthorized request');
            } else {
                setError('Login failed');
            }

            errorRef.current && errorRef.current.focus();
        }
    }

    return (<>
        {success ? (<section className="text-center py-10">
            <h1 className="text-3xl font-bold mb-4">You are logged in!</h1>
            <p>
                <Link to="/" className="text-blue-500 underline">Go to the Home page</Link>
            </p>
        </section>) : (<section className="p-4 max-w-sm mx-auto">
            <p ref={errorRef} className={error ? "text-red-500 mb-4" : "invisible"} aria-live="assertive">{error}</p>
            <h1 className="text-2xl font-bold mb-6 text-center">Sign In</h1>
            <form onSubmit={handleSubmit} className="space-y-4">
                <label htmlFor="username" className="block text-sm font-bold mb-1">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={usernameInputRef}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <label htmlFor="password" className="block text-sm font-bold mb-1">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <button className="w-full p-2 bg-blue-500 text-white rounded">Sign In</button>
            </form>

            <p className="text-center mt-4">Need an Account?<br/>
                <span><Link to="/signup" className="text-blue-500 underline">Sign Up</Link></span></p>
        </section>)}
    </>);
}

export default Login;