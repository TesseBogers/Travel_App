import axios from 'axios';
import { API_URL } from './UserService.js';

class PermissionService {
    async getAllPermissions() {
        const response = await axios.get(API_URL + 'api/permissions');
        return response.data;
    }

    async getPermissionById(id) {
        const response = await axios.get(API_URL + `api/permissions/${id}`);
        return response.data;
    }

    async getRolesWithPermission(id) {
        const response = await axios.get(API_URL + `api/permissions/${id}/roles`);
        return response.data;
    }

    async addPermissionToRole(permissionId, roleId) {
        const response = await axios.post(API_URL + `api/permissions/${permissionId}/roles/${roleId}`);
        return response.data;
    }

    async removePermissionFromRole(permissionId, roleId) {
        const response = await axios.delete(API_URL + `api/permissions/${permissionId}/roles/${roleId}`);
        return response.data;
    }
}

export default new PermissionService();