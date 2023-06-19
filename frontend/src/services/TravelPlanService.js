import axios from 'axios';
import { API_URL } from './UserService.js';

class TravelPlanService {
    async getAllTravelPlans() {
        const response = await axios.get(API_URL + 'api/travelplans');
        console.log('getAllTravelPlans response:', response.data);
        return response.data;
    }

    async getTravelPlan(id) {
        const response = await axios.get(API_URL + `api/travelplans/${id}`);
        console.log('getTravelPlan response:', response.data);
        return response.data;
    }

    async createTravelPlan(travelPlan) {
        const response = await axios.post(API_URL + 'api/travelplans', travelPlan);
        console.log('createTravelPlan response:', response.data);
        return response.data;
    }

    async updateTravelPlan(id, travelPlan) {
        const response = await axios.put(API_URL + `api/travelplans/${id}`, travelPlan);
        console.log('updateTravelPlan response:', response.data);
        return response.data;
    }

    async deleteTravelPlan(id) {
        const response = await axios.delete(API_URL + `api/travelplans/${id}`);
        console.log('deleteTravelPlan response:', response.data);
        return response.data;
    }
}

export default new TravelPlanService();