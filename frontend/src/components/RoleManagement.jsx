import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { Link } from 'react-router-dom';

const RoleManagement = () => {
    const [roles, setRoles] = useState([]);
    const [users, setUsers] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchRolesAndUsers() {
            try {
                const roleResponse = await UserService.getAllRoles();
                setRoles(Array.isArray(roleResponse.data) ? roleResponse.data : []);

                const userResponse = await UserService.getAllUsers();
                setUsers(Array.isArray(userResponse.data) ? userResponse.data : []);
            } catch (error) {
                setError(error);
            }
        }

        fetchRolesAndUsers().then(r => console.log(r));
    }, []);

    const handleRoleChange = async (userId, roleId) => {
        try {
            const response = await UserService.addRoleToUser(userId, roleId);
            // Update users state based on response
            setUsers(users.map(user => user.id === userId ? response.data : user));
        } catch (error) {
            setError(error);
        }
    };

    if (error) {
        return <div className="text-red-500 font-bold text-center mx-auto">{error.message}</div>
    }

    return (
        <div className="p-4 w-full">
            <h1 className="text-2xl font-bold mb-4">Role Management</h1>
            {users.map(user => (
                <div key={user.id} className="my-2 p-3 border border-gray-300 rounded">
                    <Link to={`/admin/users/${user.id}`} className="text-lg font-bold hover:text-blue-500">
                        {user.username}
                    </Link>
                    <p>Email: {user.email}</p>
                    <p>Roles: {user.roles.map(role => role.roleName).join(', ')}</p>
                    {user.roles.length < 4 && (
                        <div>
                            <label htmlFor={`userRole${user.id}`}>Add Role:</label>
                            <select
                                id={`userRole${user.id}`}
                                onChange={(e) => handleRoleChange(user.id, e.target.value)}
                            >
                                <option value="">Select a Role</option>
                                {roles.filter(role => !user.roles.map(userRole => userRole.id).includes(role.id)).map(role => (
                                    <option key={role.id} value={role.id}>{role.roleName}</option>
                                ))}
                            </select>
                        </div>
                    )}
                </div>
            ))}
        </div>
    );
};

export default RoleManagement;