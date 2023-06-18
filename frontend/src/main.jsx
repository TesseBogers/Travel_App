import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
<<<<<<< HEAD
import '../src/assets/scss/main.scss'
import {AuthProvider} from './context/AuthContext.jsx'
=======
import {AuthProvider} from "./context/AuthProvider.jsx";
>>>>>>> main

ReactDOM.createRoot(document.getElementById('root')).render(<React.StrictMode>
    <AuthProvider>
        <App/>
    </AuthProvider>
</React.StrictMode>,)
