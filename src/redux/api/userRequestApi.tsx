import api from '@/api';

export const addApi = async (Data: FormData) => {
  try {
    const response = await api.post('user-request-list', Data, {
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
    const response = await api.get('user-request-list', {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error fetching data');
  }
};

export const updateApi = async (id: string, Data: FormData) => {
  try {
    const response = await api.post(`user-request-list/${id}`, Data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      // params: {
      //   _method: 'PUT',
      // },
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error updating data');
  }
};


export const showApi = async (id: string) => {
  try {
    const response = await api.get(`user-request-list/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error fetching data');
  }
};


export const deleteApi = async (id: string) => {
  try {
    const response = await api.delete(`user-request-list/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error fetching data');
  }
};