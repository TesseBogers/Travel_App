import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import axios from "../api/axios.js";
import CryptoJS from 'crypto-js';

const LOGIN_ENDPOINT = "/api/users/login";

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
<<<<<<< Updated upstream
        console.log('Making request with', { username, password });
        const response = await axios.post(LOGIN_ENDPOINT, JSON.stringify({ username: username, password: password }), {
=======
        const hashedPassword = CryptoJS.SHA256(password).toString();
        const response = await axios.post(LOGIN_ENDPOINT, JSON.stringify({ username: username, password: hashedPassword }), {
>>>>>>> Stashed changes
            headers: {
                'Content-Type': 'application/json'
            },
            withCredentials: true
        });

        console.log('Received response', response);

        const { accessToken, roles } = response?.data;
        setAuth({ username, password, roles, accessToken });

        setUsername('');
        setPassword('');
        setSuccess(true);
        console.log('Login successful for username:', username);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log('Submitting form...');
            await handleLogin(username, password);
        } catch (error) {
            console.log('Error during form submission:', error);
            if (!error?.response) {
                console.log('There is a Network Error:', error);
                setError('Network Error');
            } else if (error?.response?.status === 400) {
                console.log('There is a 400 Error:', error);
                setError('Missing Username or Password');
            } else if (error?.response?.status === 401) {
                console.log('There is a 401 Error:', error);
                setError('Unauthorized request');
            } else {
                console.log('There is a 500 Error:', error);
                setError('Login failed');
            }

            console.log('Setting focus to errorRef:', errorRef);
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
                <label htmlFor="email" className="hidden text-sm font-bold mb-1">Email:</label>
                <input
                    type="text"
                    id="email"
                    ref={usernameInputRef}
                    placeholder={username ? username : "Enter your email"}
                    autoComplete="off"
                    onChange={(e) => setUsername(e.target.value)}
                    value={username}
                    required
                    className="w-full p-2 border border-gray-300 rounded"
                />

                <label htmlFor="password" className="hidden text-sm font-bold mb-1">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder={password ? password : "Enter your password"}
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