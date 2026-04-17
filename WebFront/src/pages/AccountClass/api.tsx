// library
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// in-project
import ApiClient from '@/shared/api/ApiClient';

const KEY = 'accountClass';

const api = {
    list: () => ApiClient.get('/accountClass'),
    get: (id: number) => ApiClient.get(`/accountClass/${id}`),
    create: (data: { title: string }) => ApiClient.post('/accountClass', data),
    update: (id: number, data: { title: string }) => ApiClient.put(`/accountClass/${id}`, data),
    delete: (id: number) => ApiClient.delete(`/accountClass/${id}`)
};

const ApiHooks = {
    useList: () => {
        return useQuery({ queryKey: [KEY], queryFn: () => api.list().then((res) => res.data.data) });
    },
    useGet: (id: number) => useQuery([KEY, id], () => api.get(id)),
    useCreate: () => {
        const queryClient = useQueryClient();
        return useMutation(api.create, {
            onSuccess: () => queryClient.invalidateQueries([KEY])
        });
    },
    useUpdate: (id: number) => {
        const queryClient = useQueryClient();
        return useMutation((data: { title: string }) => api.update(id, data), {
            onSuccess: () => queryClient.invalidateQueries([KEY])
        });
    },
    useDelete: (id: number) => {
        const queryClient = useQueryClient();
        return useMutation(() => api.delete(id), {
            onSuccess: () => queryClient.invalidateQueries([KEY])
        });
    }
};

export default ApiHooks;
