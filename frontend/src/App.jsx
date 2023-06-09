import { useState } from 'react'
import './App.css'
import './assets/scss/main.scss'
import CheckList from './components/CheckList';

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <CheckList/>
        </>
    )
}

export default App

