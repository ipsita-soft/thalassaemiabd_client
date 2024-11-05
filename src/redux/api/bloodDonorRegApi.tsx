import api from '@/api';

export const bloodDonorRegistration = async (Data: FormData) => {
    try {
        const response = await api.post('blood-donor-register', Data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error adding Data');
    }
}


