import axios from 'axios';
import { API_URL } from './UserService.js';


class UserProfileService {
    async getAllProfiles() {
        const response = await axios.get(API_URL + 'api/profiles');
        return response.data;
    }

    async getProfile(id) {
        const response = await axios.get(API_URL + `api/profiles/${id}`);
        return response.data;
    }

    async createProfile(userId, userProfile) {
        const response = await axios.post(API_URL + `api/profiles/${userId}`, userProfile);
        return response.data;
    }

    async updateProfile(id, userId, userProfile) {
        const response = await axios.put(API_URL + `api/profiles/${id}/${userId}`, userProfile);
        return response.data;
    }

    async deleteProfile(id) {
        const response = await axios.delete(API_URL + `api/profiles/${id}`);
        return response.data;
    }
}

export default new UserProfileService();