import api from '@/api';

export const updateApi = async (id: string, Data: FormData) => {
  try {
    const response = await api.post(`web/settings/${id}`, Data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        _method: 'PUT',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error updating data');
  }
};


export const showApi = async (id: string) => {
  try {
    const response = await api.get(`web/settings/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error fetching data');
  }
};

