import api from '@/api';

export const patientRegistration = async (Data: FormData) => {
    try {
        const response = await api.post('patient-register', Data, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error adding Data');
    }
}


