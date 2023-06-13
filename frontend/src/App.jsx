import { useState } from 'react'
import './App.css'
import './assets/scss/main.scss'
import TravelOrganizer from './pages/TravelOrganizerPage'

function App() {
    const [count, setCount] = useState(0)
    return (
        <>
            <div>
                <TravelOrganizer/>
            </div>

        </>
    )
}

export default App;

