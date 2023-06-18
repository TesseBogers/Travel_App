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
        <section className="p-4 max-w-sm mx-auto">
            <h1 className="text-2xl font-bold mb-6 text-center">Sign Up</h1>
            <form onSubmit={handleSignup} className="space-y-4">
                {Object.keys(userInput).map((key) => {
                    switch(key) {
                        case 'role':
                            return (
                                <select key="role" name="role" onChange={handleChange} multiple className="w-full p-2 border border-gray-300 rounded" value={userInput.role}>
                                    {ROLES.map((role) => (
                                        <option key={role.value} value={role.value}>{role.label}</option>
                                    ))}
                                </select>
                            );
                        case 'country':
                            return (
                                <select name="country" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" value={userInput.country}>
                                    {COUNTRIES.map((country) => (
                                        <option key={country.value} value={country.value}>{country.label}</option>
                                    ))}
                                </select>
                            );
                        case 'preferredLanguage':
                            return (
                                <select name="preferredLanguage" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" value={userInput.preferredLanguage}>
                                    {LANGUAGES.map((language) => (
                                        <option key={language.value} value={language.value}>{language.label}</option>
                                    ))}
                                </select>
                            );
                        case 'preferredCurrency':
                            return (
                                <select name="preferredCurrency" onChange={handleChange} className="w-full p-2 border border-gray-300 rounded" value={userInput.preferredCurrency}>
                                    {CURRENCIES.map((currency) => (
                                        <option key={currency.value} value={currency.value}>{currency.label}</option>
                                    ))}
                                </select>
                            );
                        case 'gdpr':
                        case 'termsAccepted':
                            return (
                                <div className="flex items-center" key={key}>
                                    <input
                                        type="checkbox"
                                        name={key}
                                        onChange={handleChange}
                                        checked={userInput[key]}
                                        className="mr-2"
                                    />
                                    <label htmlFor={key}>
                                        {key === 'gdpr' ? 'I accept the GDPR Privacy Policy' : 'I accept the Terms and Conditions'}
                                    </label>
                                </div>
                            );
                        default:
                            return (
                                <input
                                    key={key}
                                    type={key === "password" || key === "confirmPassword" ? "password" : (key === "dateOfBirth" ? "date" : "text")}
                                    name={key}
                                    placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
                                    onChange={handleChange}
                                    value={userInput[key]}
                                    className="w-full p-2 border border-gray-300 rounded"
                                />
                            );
                    }
                })}
                <button
                    type="submit"
                    className="mt-6 p-10 w-full bg-red-900 text-black">
                    Sign Up
                </button>

                <div className="text-center">
                    <Link to="/login" className="text-blue-500 hover:text-blue-600">
                        Already have an account? Log in
                    </Link>
                </div>
                {errors.general && <p className="text-red-500 text-xs italic">{errors.general}</p>}
                {success && <div className="text-center mt-4 text-green-500">Signup successful!</div>}
            </form>
        </section>
    );
};

export default SignUp;