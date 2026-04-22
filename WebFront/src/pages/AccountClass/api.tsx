// library
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

// in-project
import ApiClient from '@/shared/api/ApiClient';

const ENDPOINT = '/accountClass';
const QUERY_KEY = 'account-class';

const accountClassService = {
    async list(page: number, perPage: number, q: string | undefined) {
        const response = await ApiClient.get(ENDPOINT, { params: { page, perPage, q } });
        return response.data ?? {};
    },

    async create(payload: FormData) {
        const response = await ApiClient.post(ENDPOINT, payload);
        return response.data?.data ?? null;
    },

    async update(payload: FormData) {
        const response = await ApiClient.put(ENDPOINT, payload);
        return response.data?.data ?? null;
    },

    async delete(id: string | number) {
        const response = await ApiClient.delete(ENDPOINT, { params: { acId: id } });
        return response.data?.data;
    }
};

const useList = (page: number, perPage: number, q: string | undefined) =>
    useQuery({
        queryKey: [QUERY_KEY, page, perPage, q],
        queryFn: () => accountClassService.list(page, perPage, q)
    });

const useCreate = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: FormData) => accountClassService.create(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] })
    });
};

const useUpdate = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: FormData) => accountClassService.update(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] })
    });
};

const useDelete = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => accountClassService.delete(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] })
    });
};

export default { useList, useCreate, useUpdate, useDelete };
