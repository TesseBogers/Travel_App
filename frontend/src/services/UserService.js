import axios from 'axios';

export const API_URL = 'http://localhost:3290/';

let axiosInstance = axios.create();

const instance = axios.create({
    baseURL: API_URL,
    headers: {
        'Authorization': `Bearer ${sessionStorage.getItem('jwt')}`
    }
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = sessionStorage.getItem('jwt');
        if (token) {
            config.headers['Authorization'] = 'Bearer ' + token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error).then(response => console.log(response));
    }
);

class UserService {
    async getAllUsers() {
        const response = await axiosInstance.get(API_URL + 'api/users');
        console.log('All The Users: ', response.data);
        return response.data;
    }

    async getUserById(id) {
        const response = await axiosInstance.get(API_URL + `api/users/${id}`);
        console.log('User ID: ', response.data);
        return response.data;
    }

    async createUser(user) {
        const response = await axiosInstance.post(API_URL + 'api/users', user);
        console.log('Created User: ', response.data);
        return response.data;
    }

    async updateUser(id, user) {
        const response = await axiosInstance.put(API_URL + `api/users/${id}`, user);
        console.log('Updated User: ', response.data);
        return response.data;
    }

    async deleteUser(id) {
        const response = await axiosInstance.delete(API_URL + `api/users/${id}`);
        console.log('Deleted User: ', response.data);
        return response.data;
    }

    async assignRolesToUser(id, roles) {
        const response = await axiosInstance.post(API_URL + `api/users/${id}/roles`, roles);
        console.log('Assigned Role to User: ', response.data);
        return response.data;
    }

    async removeRolesFromUser(id, roles) {
        const response = await axiosInstance.delete(API_URL + `api/users/${id}/roles`, roles);
        console.log('Removed Role from User: ', response.data);
        return response.data;
    }

    async getUserByUsername(username) {
        const response = await axiosInstance.get(API_URL + `api/users/username/${username}`);
        console.log('User By Username: ', response.data);
        return response.data;
    }


    // assign travel plan to user
    async assignTravelPlanToUser(id, travelPlan) {
        const response = await axiosInstance.post(API_URL + `api/users/${id}/travelplans`, travelPlan);
        console.log('Assigned Travel Plan to User: ', response.data);
        return response.data;
    }

    // remove travel plan from user
    async removeTravelPlanFromUser(id, travelPlanId) {
        const response = await axiosInstance.delete(API_URL + `api/users/${id}/travelplans/${travelPlanId}`);
        console.log('Removed Travel Plan from User: ', response.data);
        return response.data;
    }

    async getUserByUserName(username) {
        const response = await axiosInstance.get(API_URL + `api/users/username/${username}`);
        console.log('User By Username: ', response.data);
        return response.data;
    }

    async getUserByEmail(email) {
        const response = await axiosInstance.get(API_URL + `api/users/email/${email}`);
        console.log('User By Email: ', response.data);
        return response.data;
    }

    async getUsersTraveling() {
        const response = await axiosInstance.get(API_URL + `api/users/traveling`);
        console.log('Users Traveling: ', response.data);
        return response.data;
    }

    // need a backend fetch for this
    async getUserByTraveling(from, to) {
        const response = await axiosInstance.get(API_URL + `api/users/traveling/${from}/${to}`);
        console.log('User By Traveling: ', response.data);
        return response.data;
    }

    async getUsersWithRole(roleName) {
        const response = await axiosInstance.get(API_URL + `api/users/roles/${roleName}`);
        console.log('Users With Role: ', response.data);
        return response.data;
    }

    async getUsersWithPermission(permissionName) {
        const response = await axiosInstance.get(API_URL + `api/users/permissions/${permissionName}`);
        console.log('Users With Permission: ', response.data);
        return response.data;
    }

    async getRolesForUser(id) {
        const response = await axiosInstance.get(API_URL + `api/users/${id}/roles`);
        console.log('Roles For User: ', response.data);
        return response.data;
    }

    async getPermissionsForUser(id) {
        const response = await axiosInstance.get(API_URL + `api/users/${id}/permissions`);
        console.log('Permissions For User: ', response.data);
        return response.data;
    }
}

export default new UserService();