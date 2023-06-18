import React, { useEffect, useState } from 'react';
import UserService from '../services/UserService';
import { Link } from "react-router-dom";

const SideBar = () => {
    const [error, setError] = useState(null);

    // check if there is an error
    if (error) {
        return <div className="text-red-500 font-bold text-center mx-auto">{error.message}</div>
    }

    return (
        <div className="sidebar h-full w-64 bg-gray-800 text-white fixed top-0 left-0 overflow-y-auto p-4">
            <h1 className="text-2xl font-bold py-4 px-6">SideBar</h1>
            <ul>
                <li className="mb-2">
                    <Link to="/admin/users" className="text-lg hover:text-blue-500">Users</Link>
                </li>
                <li className="mb-2">
                    <Link to="/admin/roles" className="text-lg hover:text-blue-500">Roles</Link>
                </li>
            </ul>
        </div>
    );
};

export default SideBar;