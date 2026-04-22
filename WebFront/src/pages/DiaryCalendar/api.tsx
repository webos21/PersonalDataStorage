import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ApiClient from '@/shared/api/ApiClient';

const ENDPOINT = '/diary';
const QUERY_KEY = 'diary-calendar';

type ListOptions = {
    year?: number;
    month?: number;
};

const service = {
    async list(page: number, perPage: number, q: string | undefined, options?: ListOptions) {
        const response = await ApiClient.get(ENDPOINT, { params: { page, perPage, q, ...options } });
        return response.data ?? {};
    },
    async create(payload: FormData) {
        const response = await ApiClient.post(ENDPOINT, payload);
        return response.data?.data?.[0] ?? null;
    },
    async update(payload: FormData) {
        const response = await ApiClient.put(ENDPOINT, payload);
        return response.data?.data?.[0] ?? null;
    },
    async delete(id: string | number) {
        const response = await ApiClient.delete(ENDPOINT, { params: { diaryId: id } });
        return response.data?.deletedRows ?? 0;
    }
};

const useList = (page: number, perPage: number, q: string | undefined, options?: ListOptions) =>
    useQuery({
        queryKey: [QUERY_KEY, page, perPage, q, options?.year, options?.month],
        queryFn: () => service.list(page, perPage, q, options)
    });

const useCreate = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: FormData) => service.create(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] })
    });
};

const useUpdate = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (payload: FormData) => service.update(payload),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] })
    });
};

const useDelete = () => {
    const qc = useQueryClient();
    return useMutation({
        mutationFn: (id: string | number) => service.delete(id),
        onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] })
    });
};

export default { useList, useCreate, useUpdate, useDelete };
