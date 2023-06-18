import React from 'react';

const MainPanel = ({ children }) => {
    return (
        <div className="main-panel flex-1 bg-white p-6 overflow-y-auto">
            <h1 className="text-2xl font-bold mb-4">MainPanel</h1>
            {children}
        </div>
    );
};

export default MainPanel;