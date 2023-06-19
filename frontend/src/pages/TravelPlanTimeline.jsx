import React, { useEffect, useState } from 'react';
import Timeline from 'react-calendar-timeline';
import 'react-calendar-timeline/lib/Timeline.css';
import moment from 'moment';
import TravelPlanService from '../services/TravelPlanService';

const TravelPlanTimeline = () => {
    const [items, setItems] = useState([]);
    const [groups, setGroups] = useState([]);
    const [selectedItem, setSelectedItem] = useState(null);
    const [travelPlan, setTravelPlan] = useState({
        id: null,
        destination: "",
        startDate: moment().format("YYYY-MM-DD"),
        endDate: moment().add(1, 'days').format("YYYY-MM-DD"),
        userId: null // This value is fetched based on the authenticated user
    });

    useEffect(() => {
        fetchTravelPlans().then(response => console.log('Use Effect:', response));
    }, []);

    const fetchTravelPlans = async () => {
        const response = await TravelPlanService.getAllTravelPlans();
        console.log('Get All The Plans:', response);

        // create timeline groups (each user is a group)
        const newGroups = response.map((plan, i) => {
            console.log('Plan:', plan);
            return { id: plan.userId, title: `User ${plan.userId}` };
        });

        // create timeline items
        const newItems = response.map((plan, i) => {
            const start_time = moment(plan.startDate);
            const end_time = moment(plan.endDate);

            return {
                id: plan.id,
                group: plan.userId,
                title: plan.destination,
                start_time: start_time.valueOf(),
                end_time: end_time.valueOf(),
                itemProps: {
                    'data-testid': 'item',
                    className: 'timeline-item',
                    onClick: () => setSelectedItem(plan.id)
                }
            };
        });

        setGroups(newGroups);
        setItems(newItems);
    };

    const handleCreate = async () => {
        await TravelPlanService.createTravelPlan(travelPlan);
        console.log('Create Plan:', travelPlan);
        await fetchTravelPlans();
        console.log('Created Plans:', items);
    };

    const handleUpdate = async () => {
        if (selectedItem) {
            await TravelPlanService.updateTravelPlan(selectedItem, travelPlan);
            console.log('Update Plan:', travelPlan);
            await fetchTravelPlans();
            console.log('Updated Plans:', items);
        }
    };

    const handleDelete = async () => {
        if (selectedItem) {
            await TravelPlanService.deleteTravelPlan(selectedItem);
            console.log('Delete Plan:', selectedItem);
            await fetchTravelPlans();
            console.log('Deleted Plans:', items);
        }
    };

    return (
        <div className="container mx-auto p-[8rem]">
            <Timeline
                className="timeline-component"
                groups={groups}
                items={items}
                defaultTimeStart={moment().add(-12, 'hour')}
                defaultTimeEnd={moment().add(12, 'hour')}
                canMove={false}
                canResize={false}
            />
            {/* Adding Buttons for CRUD Operations */}
            <div className="flex flex-row space-x-6 mt-4">
            <button onClick={handleCreate}>Create Plan</button>
            <button onClick={handleUpdate} disabled={!selectedItem}>Update Plan</button>
            <button onClick={handleDelete} disabled={!selectedItem}>Delete Plan</button>
            </div>
        </div>
    );
};

export default TravelPlanTimeline;