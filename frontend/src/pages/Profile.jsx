import { useContext } from 'react';
import AuthContext from '../context/AuthContext.jsx';
import Login from "../components/Login.jsx";
import SignUp from "../components/SignUp.jsx";

const Profile = () => {
    const { isAuthenticated } = useContext(AuthContext);

    return (
        <div>
            <h1>Profile</h1>
            { isAuthenticated ? <Login /> : <SignUp /> }
        </div>
    );
}

export default Profile;