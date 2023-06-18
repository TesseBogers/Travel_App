import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import {AuthProvider} from './context/AuthContext.jsx';
import Main from "./components/Main";
import Hero from "./components/Hero.jsx";
import TripOrganizer from "./pages/trip-organizer.jsx";
<<<<<<< HEAD
import Chat from "./pages/ChatRoom.jsx";
import Recreation from "./pages/recreation.jsx";
=======
>>>>>>> main
import Contact from "./pages/contact.jsx";
import TravelPlanTimeline from "./pages/TravelPlanTimeline.jsx";
import AboutUs from "./components/AboutUs.jsx";
import Features from "./components/Features.jsx";
import Service from "./components/Service.jsx";
<<<<<<< HEAD
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
=======
import Footer from "./components/Footer.jsx";
import ChatRoom from "./pages/Chat.jsx";

function App() {
    return (
      <Router>
        <NavBar />
        <Routes>
          <Route
            exact
            path="/"
            element={
              <>
                <Hero />
                <About />
                <Features />
                <Service />
                <Footer />
              </>
            }
          />
          <Route path="/timeline" element={<Timeline />} />
          <Route path="/trip-organizer" element={<TripOrganizer />} />
          <Route path="/chat" element={<ChatRoom />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </Router>
    );
>>>>>>> main
}

export default App;