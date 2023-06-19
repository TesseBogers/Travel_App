import { useRef, useState, useEffect, useContext } from 'react';
import AuthContext from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import axios from "../api/axios.js";

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
        console.log('Making request with', { username, password });
        try {
            const response = await axios.post(LOGIN_ENDPOINT, { username, password }, {
                withCredentials: true
            });

            console.log('Received response', response);

            if (response.status === 200) {
                console.log('Login successful.');
                setAuth(true);
                setUsername('');
                setPassword('');
                setSuccess(true);
            } else {
                console.error('Unexpected response status:', response.status);
                setError('Login failed');
            }
        } catch (error) {
            console.log('Error during login:', error);
            setError('Network Error');
        }
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

            <p className="text-center mt-4">Need an Account? Sign Up</p>
        </section>)}
    </>);
}

export default Login;