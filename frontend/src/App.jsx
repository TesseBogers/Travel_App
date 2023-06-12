import { useState } from 'react'
import './App.css'
import './assets/scss/main.scss'
import CheckList from './components/CheckList';
import StreetMap from "./components/StreetMap.jsx";


function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <StreetMap/>
            <CheckList/>
        </>
    )
}

export default App

