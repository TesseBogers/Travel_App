import Food from "../components/Food";
import Housing from "../components/Housing";
import Transportation from "../components/Transportation";
import Visits from "../components/Visits";
import '../components/TravelOrganizer.css';


const TravelOrganizer = () => {
    return (
        <div className="travel-organizer">
           <div className="row">
            <div className="col"><h2 className="text-xl font-bold">Monday</h2>
            <Transportation />
              <Housing />
              <Visits />
              <Food />
              </div>
            <div className="col"><h2 className="text-xl font-bold">Thuesday</h2>
            <Transportation />
              <Housing />
              <Visits />
              <Food /></div>
            <div className="col"><h2 className="text-xl font-bold">Wednesday</h2>
            <Transportation />
              <Housing />
              <Visits />
              <Food />
              </div>
            <div className="col"><h2 className="text-xl font-bold">Thursday</h2>
            <Transportation />
              <Housing />
              <Visits />
              <Food />
              </div>
            <div className="col"><h2 className="text-xl font-bold">Friday</h2>
            <Transportation />
              <Housing />
              <Visits />
              <Food />
              </div>
            <div className="col"><h2 className="text-xl font-bold">Saturday</h2>
            <Transportation />
              <Housing />
              <Visits />
              <Food />
              </div>
            <div className="col"><h2 className="text-xl font-bold">Sunday</h2>
            <Transportation />
              <Housing />
              <Visits />
              <Food />
              </div>
          </div>
        </div>
      );
}

export default TravelOrganizer;
