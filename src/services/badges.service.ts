import request, { Methods } from './../util/request';
import { BadgeFormValues, BadgeModel } from '../models/badges.model';

class BadgesService {
    async getBadges() {
        return request<BadgeModel[]>({ method: Methods.GET, resource: 'badges' });
    }
    async getBadge(id: string | number) {
        return request<BadgeModel>({ method: Methods.GET, resource: `badges/${id}` });
    }
    async updateBadge(id: string | number, data: BadgeFormValues) {
        return request<BadgeModel>({ method: Methods.PUT, resource: `badges/${id}`, data });
    }
    async createBadge(data: BadgeFormValues) {
        return request<BadgeModel>({ method: Methods.POST, resource: 'badges', data });
    }
    async deleteBadge(id: string | number) {
        return request<BadgeModel>({ method: Methods.DELETE, resource: `badges/${id}` });
    }
}

export const badgesService = new BadgesService();