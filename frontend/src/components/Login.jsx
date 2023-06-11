import {useRef, useState, useEffect, useContext} from 'react';
import AuthContext from "../context/AuthProvider.jsx";
import {Link} from "react-router-dom";
import axios from "../api/axios.js";

const LOGIN_URL = "/auth";
const Login = () => {
    const {setAuth} = useContext(AuthContext);
    const userRef = useRef();
    const errorRef = useRef();

    const [user, setUser] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, []);

    useEffect(() => {
        setError('');
    }, [user, password]);

    const handleSubmit = async (event) => {
        event.preventDefault();
        console.log(user, password);

        try {
            const response = await axios.post(LOGIN_URL, JSON.stringify({username: user, password: password}), {
                headers: {
                    'Content-Type': 'application/json'
                },
                withCredentials: true
            }
            );
            console.log(JSON.stringify(response?.data));
            // console.log(response);
            const accessToken = response?.data?.accessToken;
            const roles = response?.data?.roles;
            setAuth({ user, password, roles, accessToken });
            setUser('');
            setPassword('');
            setSuccess(true);
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
            errorRef.current.focus();
        }



        // if (user === 'admin' && password === 'password') {
        //     setSuccess(true);
        //     setError('');
        // } else {
        //     setError('Incorrect username or password');
        //     userRef.current.focus();
        // }
    }

    return (<>
        {success ? (<section>
            <h1>You are logged in!</h1><br/>
            <p>
                <Link to="/">Got to the Home page</Link>
            </p>
        </section>) : (<section>
            <p ref={errorRef} className={error ? "errormessage" : "offscreen"} aria-live="assertive">{error}</p>
            <h1>Sign In</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username:</label>
                <input
                    type="text"
                    id="username"
                    ref={userRef}
                    autoComplete="off"
                    onChange={(e) => setUser(e.target.value)}
                    value={user}
                    required
                />

                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    required
                />

                <button>Sign In</button>
            </form>

            <p>Need an Account?<br/>
                <span><Link to="#">Sign Up</Link></span></p>
        </section>)}
    </>);
}

export default Login;