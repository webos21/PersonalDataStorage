import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ApiClient from '@/shared/api/ApiClient';
const ENDPOINT = '/bank';
const QUERY_KEY = 'bank';
const service = {
    async list(page: number, perPage: number, q: string | undefined) { const response = await ApiClient.get(ENDPOINT, { params: { page, perPage, q } }); return response.data ?? {}; },
    async create(payload: FormData) { const response = await ApiClient.post(ENDPOINT, payload); return response.data?.data?.[0] ?? null; },
    async update(payload: FormData) { const response = await ApiClient.put(ENDPOINT, payload); return response.data?.data?.[0] ?? null; },
    async delete(id: string | number) { const response = await ApiClient.delete(ENDPOINT, { params: { bankId: id } }); return response.data?.deletedRows ?? 0; }
};
const useList = (page: number, perPage: number, q: string | undefined) => useQuery({ queryKey: [QUERY_KEY, page, perPage, q], queryFn: () => service.list(page, perPage, q) });
const useCreate = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (payload: FormData) => service.create(payload), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }) }); };
const useUpdate = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (payload: FormData) => service.update(payload), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }) }); };
const useDelete = () => { const qc = useQueryClient(); return useMutation({ mutationFn: (id: string | number) => service.delete(id), onSuccess: () => qc.invalidateQueries({ queryKey: [QUERY_KEY] }) }); };
export default { useList, useCreate, useUpdate, useDelete };
