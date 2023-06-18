import axios from 'axios';

const API_URL = 'http://localhost:3290/';

class RoleService {
    async getAllRoles() {
        const response = await axios.get(API_URL + 'api/roles');
        return response.data;
    }

    async getRoleById(id) {
        const response = await axios.get(API_URL + `api/roles/${id}`);
        return response.data;
    }

    async getUsersWithRole(id) {
        const response = await axios.get(API_URL + `api/roles/${id}/users`);
        return response.data;
    }

    async addRoleToUser(roleId, userId) {
        const response = await axios.post(API_URL + `api/roles/${roleId}/users/${userId}`);
        return response.data;
    }
}

export default new RoleService();