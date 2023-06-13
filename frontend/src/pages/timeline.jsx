import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import CreateTravelPlanForm from '../components/CreateTravelPlanForm';
import EditTravelPlanForm from '../components/EditTravelPlanForm';
import DeleteTravelPlanButton from '../components/DeleteTravelPlanButton';
import TimelineDetail from "../components/TimelineDetail.jsx";

function Timeline() {
    const [travelPlans, setTravelPlans] = useState([]);
    const [editingPlanId, setEditingPlanId] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        axios.get('/api/travelplans')
            .then(response => {
            setTravelPlans(response.data);
            console.log(response.data);
        })
            .catch(error => {
                console.error(error);
                setError(error.message || 'Could not fetch travel plans. Please try again later.');
            });
    }, []);

    const handleNewPlan = (newPlan) => {
        setTravelPlans(prevPlans => [newPlan, ...prevPlans]);
    };

    const handlePlanUpdate = (updatedPlan) => {
        setTravelPlans(prevPlans => prevPlans.map(plan => plan.id === updatedPlan.id ? updatedPlan : plan));
        setEditingPlanId(null); // stop editing after update
    };

    const handlePlanDelete = (deletedPlanId) => {
        setTravelPlans(prevPlans => prevPlans.filter(plan => plan.id !== deletedPlanId));
    };

    return (
        <div className="mt-[10rem] ml-[3rem]">
            {error && <p>Error: {error}</p>}
            <TimelineDetail />
            <CreateTravelPlanForm onNewPlan={handleNewPlan} />
            {travelPlans.map(plan => (
                <div key={plan.id}>
                    <Link to={`/timeline/${plan.id}`}>{plan.title}</Link>
                    {editingPlanId === plan.id ? (
                        <EditTravelPlanForm plan={plan} onPlanUpdate={handlePlanUpdate} />
                    ) : (
                        <button onClick={() => setEditingPlanId(plan.id)}>Edit</button>
                    )}
                    <DeleteTravelPlanButton plan={plan} onPlanDelete={handlePlanDelete} />
                </div>
            ))}
        </div>
    );
}

export default Timeline;