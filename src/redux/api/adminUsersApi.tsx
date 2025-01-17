import api from '@/api';

export const addApi = async (Data: FormData) => {
    try {
        const response = await api.post('management/admin-user', Data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error adding Data');
    }
}
export const getApi = async (params = {}) => {
    try {
        const response = await api.get('management/admin-user', {
            params,
        });
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching data');
    }
};

