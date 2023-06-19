import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchAllUsers() {
            try {
                const response = await UserService.getAllUsers();
                setUsers(Array.isArray(response.data) ? response.data : []);
            } catch (error) {
                setError(error);
            }
        }
        fetchAllUsers().then(r => console.log(r));
    }, []);

    if (error) {
        return <div className="text-red-500 font-bold text-center mx-auto">{error.message}</div>
    }

    return (
        <div className="p-4 w-full">
            <h1 className="text-2xl font-bold mb-4">Users</h1>
            {users.map(user => (
                <div key={user.id} className="my-2 p-3 border border-gray-300 rounded">
                    <Link to={`/admin/users/${user.id}`} className="text-lg font-bold hover:text-blue-500">
                        {user.username}
                    </Link>
                    <p>Email: {user.email}</p>
                    <p>Roles: {user.roles.map(role => role.roleName).join(', ')}</p>
                </div>
            ))}
        </div>
    );
};

export default UserList;