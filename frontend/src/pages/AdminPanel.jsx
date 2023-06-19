import React from 'react';
import {Outlet, useRoutes} from 'react-router-dom';
import SideBar from '../components/SideBar.jsx';
import MainPanel from '../components/MainPanel.jsx';
import UserList from '../components/UserList.jsx';
import UserDetails from '../components/UserDetails.jsx';
import RoleManagement from '../components/RoleManagement.jsx';
import Main from "../components/Main.jsx";

const AdminPanel = () => {
    const routes = useRoutes([
        {path: 'users', element: <UserList/>},
        {path: 'users/:id', element: <UserDetails/>},
        {path: 'roles', element: <RoleManagement/>},
        {path: '*', element: <Outlet/>},
    ]);

    return (
        <Main>
            <div className="admin flex flex-row bg-black">
                <SideBar/>
                <div className="flex-1">
                    <MainPanel>
                        {routes}
                    </MainPanel>
                </div>
            </div>
        </Main>
    );
};

export default AdminPanel;