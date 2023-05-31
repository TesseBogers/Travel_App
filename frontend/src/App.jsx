import { useState } from 'react'
import './App.css'
import './assets/scss/main.scss'
// import ChooseButton from "./components/ChooseButton.jsx";
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

