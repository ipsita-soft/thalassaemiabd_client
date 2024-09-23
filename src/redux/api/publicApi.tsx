import api from "@/api";

export const getPublicSlider = async (params = {}) => {
    try {
        const response = await api.get('public/sliders', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching sliders');
    }
};