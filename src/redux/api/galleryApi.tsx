import api from '@/api';

export const addApi = async (Data: FormData) => {
  try {
    const response = await api.post('web/galleries', Data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error adding Data');
  }
};


export const getApi = async (params = {}) => {
  try {
    const response = await api.get('web/galleries', {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error fetching data');
  }
};

export const updateApi = async (id: string, Data: FormData) => {
  try {
    const response = await api.post(`web/galleries/${id}`, Data, {
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
    const response = await api.get(`web/galleries/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error fetching data');
  }
};


export const deleteApi = async (id: string) => {
  try {
    const response = await api.delete(`web/galleries/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error fetching data');
  }
};