import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { useParams } from 'react-router-dom';

const UserDetails = () => {
    let { id } = useParams();
    const [user, setUser] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchUser() {
            try {
                const response = await UserService.getUserById(id);
                setUser(response.data);
            } catch (error) {
                setError(error);
            }
        }
        fetchUser().then(r => console.log(r));
    }, [id]);

    if (error) {
        return <div className="text-red-500 font-bold text-center mx-auto">{error.message}</div>
    }

    return user ? (
        <div className="p-4 w-full">
            <h1 className="text-2xl font-bold mb-4">User Details for {user.username}</h1>
            <p>Email: {user.email}</p>
            <p>Roles: {user.roles.map(role => role.roleName).join(', ')}</p>
            {/* Display other user details as needed */}
        </div>
    ) : <p>Loading...</p>;
};

export default UserDetails;
