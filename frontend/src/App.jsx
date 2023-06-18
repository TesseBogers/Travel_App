import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from './context/AuthContext.jsx';
import Main from "./components/Main";
import Hero from "./components/Hero.jsx";
import TripOrganizer from "./pages/trip-organizer.jsx";
import Chat from "./pages/ChatRoom.jsx";
import Recreation from "./pages/recreation.jsx";
import Contact from "./pages/contact.jsx";
import TravelPlanTimeline from "./pages/TravelPlanTimeline.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Features from "./components/Features.jsx";
import Service from "./components/Service.jsx";
import AdminPanel from "./pages/AdminPanel.jsx";
import Profile from "./pages/Profile.jsx";

function App() {
    return (
        <Router>
            <Routes>
                <Route exact path="/" element={<Main>
                    <Hero/>
                    <AboutUs/>
                    <Features/>
                    <Service/>
                </Main>}/>
                <Route path="/timeline" element={<AuthProvider><Main>
                    <TravelPlanTimeline/>
                </Main></AuthProvider>}/>
                <Route path="/trip-organizer" element={<AuthProvider><Main>
                    <TripOrganizer/>
                </Main></AuthProvider>}/>
                <Route path="/chat" element={<Main>
                    <Chat/>
                </Main>}/>
                <Route path="/recreation" element={<AuthProvider><Main>
                    <Recreation/>
                </Main></AuthProvider>}/>
                <Route path="/admin/*" element={<AdminPanel/>}/>
                <Route path="/contact" element={<Main>
                    <Contact/>
                </Main>}/>
                <Route path="/profile" element={<AuthProvider><Main>
                    <Profile/>
                </Main></AuthProvider>}/>
            </Routes>
        </Router>
    )
}

export default App;