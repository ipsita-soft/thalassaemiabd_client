import api from '@/api';

export const addSliderApi = async (sliderData: FormData) => {
  try {
    const response = await api.post('web/sliders', sliderData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error adding slider');
  }
};


export const getSlidersApi = async (params = {}) => {
  try {
    const response = await api.get('web/sliders', {
      params,
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error fetching sliders');
  }
};

export const updateSliderApi = async (id: string, sliderData: FormData) => {
  try {
    const response = await api.post(`web/sliders/${id}`, sliderData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      params: {
        _method: 'PUT',
      },
    });
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error updating slider');
  }
};


export const showSliderApi = async (id: string) => {
  try {
    const response = await api.get(`web/sliders/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error fetching sliders');
  }
};


export const deleteSliderApi = async (id: string) => {
  try {
    const response = await api.delete(`web/sliders/${id}`);
    return response.data;
  } catch (error: any) {
    throw error.response ? error.response.data : new Error('Error fetching sliders');
  }
};