import React, {useState} from 'react';
import axios from 'axios';

function EditTravelPlanForm({plan, onPlanUpdate}) {
    const [title, setTitle] = useState(plan.title);
    const [description, setDescription] = useState(plan.description);
    const [error, setError] = useState(null);

    const handleSubmit = event => {
        event.preventDefault();
        axios
            .put(`/api/travelplans/${plan.id}`, {title, description})
            .then(response => {
                // notify the parent component of the plan update
                onPlanUpdate(response.data);
            })
            .catch(error => {
                console.error(error);
                setError(error.message || 'Something went wrong')
            });
    };

    return (<>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <input
                    value={title}
                    onChange={e => setTitle(e.target.value)}
                    required
                />
                <textarea
                    value={description}
                    onChange={e => setDescription(e.target.value)}
                />
                <button type="submit">Update</button>
            </form>
        </>);
}

export default EditTravelPlanForm;