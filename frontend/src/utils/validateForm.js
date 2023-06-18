// Helper functions to validate different parts of the form
function validateUsername(username) {
    if (!username.trim()) {
        return "Username is required";
    } else if (username.trim().length > 50) {
        return "Username must be less than 50 characters";
    }
    return null;
}

function validateEmail(email) {
    if (!email.trim()) {
        return "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        return "Email address is invalid";
    }
    return null;
}

function validateConfirmEmail(email, confirmEmail) {
    if (!confirmEmail.trim()) {
        return "Confirm Email is required";
    } else if (email !== confirmEmail) {
        return "Emails do not match";
    }
    return null;
}

function validatePassword(password) {
    if (!password.trim()) {
        return "Password is required";
    } else if (password.length < 8) {
        return "Password must be at least 8 characters long";
    } else if (password.length > 20) {
        return "Password must be less than 20 characters";
    } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*\W)/.test(password)) {
        return "Password must contain at least one uppercase letter, one lowercase letter, one digit, and one special character";
    }
    return null;
}

function validateConfirmPassword(password, confirmPassword) {
    if (!confirmPassword.trim()) {
        return "Confirm Password is required";
    } else if (password !== confirmPassword) {
        return "Passwords do not match";
    }
    return null;
}

function validateAge(age) {
    if (age.trim() && isNaN(age)) {
        return "Age must be a numeric value";
    }
    return null;
}

function validateDateOfBirth(dateOfBirth) {
    const currentDate = new Date();
    const enteredDate = new Date(dateOfBirth);

    if (dateOfBirth.trim() && isNaN(enteredDate.getTime())) {
        return "Invalid date format";
    } else if (enteredDate > currentDate) {
        return "Date of birth cannot be in the future";
    }
    return null;
}

function validateTermsAccepted(termsAccepted) {
    if (!termsAccepted) {
        return "You must accept the terms and conditions";
    }
    return null;
}

function validateCountry(country) {
    if (country === "") {
        return "Please select a country";
    }
    return null;
}

function validateGDPR(gdpr) {
    if (!gdpr) {
        return "You must accept the GDPR Privacy Policy";
    }
    return null;
}

export function validateForm(formData = {}) {
    // Provide default values to prevent TypeError
    const {
        username = '',
        password = '',
        confirmPassword = '',
        email = '',
        confirmEmail = '',
        gdpr = false,
        age = '',
        dateOfBirth = '',
        termsAccepted = false,
        country = ''
    } = formData;

    let errors = {};

    // Validate individual fields
    errors.username = validateUsername(username);
    errors.password = validatePassword(password);
    errors.confirmPassword = validateConfirmPassword(password, confirmPassword);
    errors.email = validateEmail(email);
    errors.confirmEmail = validateConfirmEmail(email, confirmEmail);
    errors.gdpr = validateGDPR(gdpr);
    errors.age = validateAge(age);
    errors.dateOfBirth = validateDateOfBirth(dateOfBirth);
    errors.termsAccepted = validateTermsAccepted(termsAccepted);
    errors.country = validateCountry(country);

    // Remove null values from errors object
    Object.keys(errors).forEach(key => errors[key] === null && delete errors[key]);

    return Object.keys(errors).length > 0 ? errors : null;
}

export function validateField(fieldName, value = '', confirmValue = '') {
    let error = null;

    switch (fieldName) {
        case "username":
            error = validateUsername(value);
            break;
        case "email":
            error = validateEmail(value);
            break;
        case "confirmEmail":
            error = validateConfirmEmail(value, confirmValue);
            break;
        case "password":
            error = validatePassword(value);
            break;
        case "confirmPassword":
            error = validateConfirmPassword(value, confirmValue);
            break;
        case "gdpr":
            error = validateGDPR(value);
            break;
        case "age":
            error = validateAge(value);
            break;
        case "dateOfBirth":
            error = validateDateOfBirth(value);
            break;
        case "termsAccepted":
            error = validateTermsAccepted(value);
            break;
        case "country":
            error = validateCountry(value);
            break;
        default:
            break;
    }

    return error;
}