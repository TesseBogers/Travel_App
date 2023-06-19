import React, {useState} from 'react';
import axios from 'axios';

function DeleteTravelPlanButton({ plan, onPlanDelete }) {
    const [error, setError] = useState(null);
    const handleDelete = () => {
        axios
            .delete(`/api/travelplans/${plan.id}`)
            .then(() => {
                // notify the parent component of the plan deletion
                onPlanDelete(plan.id);
            })
            .catch(err => {
                console.error(err);
                setError(err.message || 'Could not delete travel plan. Please try again later.');
            });
    };

    return <button onClick={handleDelete}>Delete</button>;
}

export default DeleteTravelPlanButton;