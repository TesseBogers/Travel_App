import React, { useState } from 'react';
import axios from 'axios';

function CreateTravelPlanForm({ onNewPlan }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [error, setError] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .post('/api/travelplans', { title, description })
            .then(response => {
                // notify the parent component of the new plan
                onNewPlan(response.data);
            })
            .catch(error => {
                console.error(error);
                setError(error.message || 'Something went wrong');
            });
    };

    return(<>
        {error && <p>Error: {error}</p>}
        <form onSubmit={handleSubmit}>
            <input
                value={title}
                onChange={e => setTitle(e.target.value)}
                placeholder="Title"
                required
            />
            <textarea
                value={description}
                onChange={e => setDescription(e.target.value)}
                placeholder="Description"
            />
            <button type="submit">Create</button>
        </form>
    </>);
}

export default CreateTravelPlanForm;
