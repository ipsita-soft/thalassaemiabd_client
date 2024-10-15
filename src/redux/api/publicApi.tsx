import api from "@/api";

export const getPublicSlider = async (params = {}) => {
    try {
        const response = await api.get('public/sliders', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching sliders');
    }
};
export const getDoctorSlider = async (params = {}) => {
    try {
        const response = await api.get('public/doctor-sliders', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching data');
    }
};
export const getWishers = async (params = {}) => {
    try {
        const response = await api.get('public/wishers', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching data');
    }
};
export const getPublicBlogNews = async (params = {}) => {
    try {
        const response = await api.get('public/blog-news', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching Blog');
    }
};


export const getPublicEvent = async (params = {}) => {
    try {
        const response = await api.get('public/events', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching events');
    }
};

export const getSingleEvent = async (id: string | number) => {
    try {
        const response = await api.get(`public/event/${id}`);
        return response; 
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching events');
    }
};

export const getSingleBlogNews = async (id: string | number) => {
    try {
        const response = await api.get(`public/blog-news/${id}`);
        return response; 
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching events');
    }
};


export const getGallery = async (params = {}) => {
    try {
        const response = await api.get('public/gallery', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching gallery');
    }
};


export const getSetting = async (params = {}) => {
    try {
        const response = await api.get('public/settings', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching setting');
    }
};

export const getMissionVision = async (params = {}) => {
    try {
        const response = await api.get('public/mission-vision', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching mission-vision');
    }
};


export const getBtsHistory = async (params = {}) => {
    try {
        const response = await api.get('public/bts-history', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching bts-history');
    }
};


export const getWhoWeArePage = async (params:string) => {
    try {
        const response = await api.get(`public/who-we-are-page/${params}`);
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching who-we-are-page');
    }
};
