import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import EditTravelPlanForm from './EditTravelPlanForm';
import DeleteTravelPlanButton from "./DeleteTravelPlanButton.jsx";

function TimelineDetail() {
  const { id } = useParams();
  const [travelPlan, setTravelPlan] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (id) {
      axios.get(`/api/travelplans/${id}`).then(response => {
        setTravelPlan(response.data);
      })
      .catch(error => {
        console.error(error);
        setError(error.message || 'Could not fetch travel plan. Please try again later.');
        });
      }
  }, [id]);

  return (
    <div>
      {travelPlan && (
        <div>
          {error && <p>Error: {error}</p>}
          <h1>{travelPlan.title}</h1>
          <EditTravelPlanForm travelPlan={travelPlan} />
          <DeleteTravelPlanButton />
        </div>
      )}
    </div>
  );
}

export default TimelineDetail;