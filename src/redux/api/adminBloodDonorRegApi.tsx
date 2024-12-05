import api from '@/api';

export const bloodDonorRegistration = async (Data: FormData) => {
    try {
        const response = await api.post('management/admin-blood-donor', Data, {
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
        const response = await api.get('management/admin-blood-donor', {
            params,
        });
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching data');
    }
};

