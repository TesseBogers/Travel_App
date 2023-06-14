import { useState } from 'react'
import './App.css'
import './assets/scss/main.scss'
import CheckList from './components/CheckList';
import StreetMap from "./components/StreetMap.jsx";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import TripOrganizer from "./pages/trip-organizer.jsx";
import Chat from "./pages/chat.jsx";
import Recreation from "./pages/recreation.jsx";
import Contact from "./pages/contact.jsx";
import Timeline from "./pages/timeline.jsx";
import About from "./components/About.jsx";
import Features from "./components/Features.jsx";
import Service from "./components/Service.jsx";
import Footer from "./components/Footer.jsx";

function App() {
    return (<Router>
            <NavBar/>
            <StreetMap/>
            <CheckList/>
            <Routes>
                <Route exact path="/" element={<>
                    <Hero/>
                    <About />
                    <Features />
                    <Service />
                    <Footer />
                </>}
                />
                <Route path="/timeline" element={<Timeline/>}/>
                <Route path="/trip-organizer" element={<TripOrganizer/>}/>
                <Route path="/chat" element={<Chat/>}/>
                <Route path="/recreation" element={<Recreation/>}/>
                <Route path="/contact" element={<Contact/>}/>
            </Routes>
        </Router>)
}

export default App;