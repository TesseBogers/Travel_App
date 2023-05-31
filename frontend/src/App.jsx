import { useState } from 'react'
import './App.css'
import './assets/scss/main.scss'
import TitlePage from "./components/TitlePage.jsx";
import CheckList from './components/CheckList';

function App() {
    const [count, setCount] = useState(0)

    return (
        <>
            <TitlePage/>
          <CheckList/>

        </>
    )
}

export default App

