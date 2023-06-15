import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import NavBar from "./components/NavBar.jsx";
import Hero from "./components/Hero.jsx";
import TripOrganizer from "./pages/trip-organizer.jsx";
import Contact from "./pages/contact.jsx";
import Timeline from "./pages/timeline.jsx";
import About from "./components/About.jsx";
import Features from "./components/Features.jsx";
import Service from "./components/Service.jsx";
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
}

export default App;