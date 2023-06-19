import { useState, useContext } from 'react';
import AuthContext from "../context/AuthContext.jsx";
import { Link } from "react-router-dom";
import axios from "../api/axios.js";
import {validateForm, validateField, validateRole} from "../utils/validateForm.js";
import {ROLES, COUNTRIES, LANGUAGES, CURRENCIES} from "../utils/constants.js";

const SIGNUP_ENDPOINT = "/api/users";

const SignUp = () => {
    const { setAuth } = useContext(AuthContext);
    const [userInput, setUserInput] = useState({
        username: '',
        password: '',
        confirmPassword: '',
        email: '',
        confirmEmail: '',
        firstName: '',
        lastName: '',
        dateOfBirth: '',
        role: [],
        country: '',
        preferredLanguage: '',
        preferredCurrency: '',
        gdpr: false,
        termsAccepted: false
    });

    const [role, setRole] = useState('');
    const [errors, setErrors] = useState({});
    const [success, setSuccess] = useState(false);

    const handleSignup = async (event) => {
        event.preventDefault();

        const roleError = validateRole(userInput.role);
        if (roleError) {
            setErrors(prevErrors => ({
                ...prevErrors,
                role: roleError
            }));
            return;
        }

        const validationErrors = validateForm(userInput);
        console.log("Validation Errors:", validationErrors);
        if (validationErrors) {
            setErrors(validationErrors);
            return;
        }

        const userProfileData = {
            firstName: userInput.firstName,
            lastName: userInput.lastName,
            dateOfBirth: userInput.dateOfBirth,
            country: userInput.country,
            preferredLanguage: userInput.preferredLanguage,
            preferredCurrency: userInput.preferredCurrency,
        };

        const userData = {
            username: userInput.username,
            password: userInput.password,
            email: userInput.email,
            roles: userInput.role,
            userProfile: userProfileData,
        };

        console.log("User Data:", userData);

        try {
            console.log("Attempting to post user data...");
            const response = await axios.post(SIGNUP_ENDPOINT, userData, {
                withCredentials: true
            });
            console.log("Response from server:", response);
            const { accessToken } = response?.data;
            setAuth({ username: userInput.username, email: userInput.email, accessToken });
            setSuccess(true);
        } catch (error) {
            console.error("Signup failed:", error);
            setErrors({ general: 'Signup failed' });
        }
    };


    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.type === 'checkbox' ? event.target.checked :
            (event.target.type === 'select-multiple' ? Array.from(event.target.selectedOptions, option => option.value) : event.target.value);
        const confirmValue = name === 'password' ? userInput.confirmPassword :
            (name === 'email' ? userInput.confirmEmail : '');

        setUserInput({
            ...userInput,
            [name]: value
        });

        let fieldErrors;
        if (name === 'role') {
            fieldErrors = validateRole(value);
        } else {
            fieldErrors = validateField(name, value, confirmValue);
        }

        setErrors(prevErrors => ({
            ...prevErrors,
            [name]: fieldErrors
        }));
    };

    return (
        <section className="p-4 max-w-lg mx-auto">
            <div className="flex flex-row justify-center items-center mb-10 gap-10">
                <div className="logo-secondary-container">
                    <img src="src/assets/images/logo/2.png" alt="logo" className="logo-secondary mx-auto" />
                </div>
            <h1 className="font-bold font-roboto text-center text-3xl">Create your account</h1>
            </div>
            <form onSubmit={handleSignup} className="space-y-4">
                <div className="w-full">
                    <input
                        type="text"
                        name="username"
                        placeholder="Username"
                        onChange={handleChange}
                        value={userInput.username}
                        className="input-authentication w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="flex -mx-2">
                    <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        onChange={handleChange}
                        value={userInput.password}
                        className="input-authentication w-1/2 p-2 border border-gray-300 rounded mx-2"
                    />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        onChange={handleChange}
                        value={userInput.confirmPassword}
                        className="input-authentication w-1/2 p-2 border border-gray-300 rounded mx-2"
                    />
                </div>

                <div className="flex -mx-2">
                    <input
                        type="text"
                        name="email"
                        placeholder="Email"
                        onChange={handleChange}
                        value={userInput.email}
                        className="input-authentication w-1/2 p-2 border border-gray-300 rounded mx-2"
                    />
                    <input
                        type="text"
                        name="confirmEmail"
                        placeholder="Confirm Email"
                        onChange={handleChange}
                        value={userInput.confirmEmail}
                        className="input-authentication w-1/2 p-2 border border-gray-300 rounded mx-2"
                    />
                </div>

                <div className="flex -mx-2">
                    <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        onChange={handleChange}
                        value={userInput.firstName}
                        className="input-authentication w-1/2 p-2 border border-gray-300 rounded mx-2"
                    />
                    <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        onChange={handleChange}
                        value={userInput.lastName}
                        className="input-authentication w-1/2 p-2 border border-gray-300 rounded mx-2"
                    />
                </div>

                <div className="w-full">
                    <input
                        type="date"
                        name="dateOfBirth"
                        placeholder="Date of Birth"
                        onChange={handleChange}
                        value={userInput.dateOfBirth}
                        className="input-authentication w-full p-2 border border-gray-300 rounded"
                    />
                </div>

                <div className="w-full">
                    <select name="role" onChange={handleChange} multiple className="input-authentication w-full p-2 border border-gray-300 rounded" value={userInput.role}>
                        {ROLES.map((role) => (
                            <option key={role.value} value={role.value}>{role.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex -mx-2">
                    <select name="country" onChange={handleChange} className="input-authentication w-1/2 p-2 border border-gray-300 rounded mx-2" value={userInput.country}>
                        {COUNTRIES.map((country) => (
                            <option key={country.value} value={country.value}>{country.label}</option>
                        ))}
                    </select>

                    <select name="preferredLanguage" onChange={handleChange} className="input-authentication w-1/2 p-2 border border-gray-300 rounded mx-2" value={userInput.preferredLanguage}>
                        {LANGUAGES.map((language) => (
                            <option key={language.value} value={language.value}>{language.label}</option>
                        ))}
                    </select>
                </div>

                <div className="w-full">
                    <select name="preferredCurrency" onChange={handleChange} className="input-authentication w-full p-2 border border-gray-300 rounded" value={userInput.preferredCurrency}>
                        {CURRENCIES.map((currency) => (
                            <option key={currency.value} value={currency.value}>{currency.label}</option>
                        ))}
                    </select>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="gdpr"
                        onChange={handleChange}
                        checked={userInput.gdpr}
                        className="mr-2"
                    />
                    <label htmlFor="gdpr">
                        I accept the GDPR Privacy Policy
                    </label>
                </div>

                <div className="flex items-center">
                    <input
                        type="checkbox"
                        name="termsAccepted"
                        onChange={handleChange}
                        checked={userInput.termsAccepted}
                        className="mr-2"
                    />
                    <label htmlFor="termsAccepted">
                        I accept the Terms and Conditions
                    </label>
                </div>


                <button
                    type="submit"
                    className="mt-6 p-10 w-full bg-red-900 text-black">
                    Sign Up
                </button>


                <p className="text-center text-blue-500 hover:text-blue-600">
                    Already have an account? Log in
                </p>


                {errors.general && <p className="text-red-500 text-xs italic">{errors.general}</p>}
                {success && <div className="text-center mt-4 text-green-500">Signup successful!</div>}
            </form>
        </section>
    );

};

export default SignUp;