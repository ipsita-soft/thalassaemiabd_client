import api from "@/api";

export const verifyPhone = async (params = {}) => {
    try {
        const response = await api.post('verify-phone', params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error adding Data');
    }
}

export const resendVerifyPhone = async (params = {}) => {
    try {
        const response = await api.post('resend-verify-phone', params, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });
        return response.data;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error adding Data');
    }
}


export const getPublicSlider = async (params = {}) => {
    try {
        const response = await api.get('public/sliders', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching sliders');
    }
};


export const permissionsAll = async (params = {}) => {
    try {
        const response = await api.get('public/permissions-all', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching data');
    }
};


export const getPublicCountries = async (params = {}) => {
    try {
        const response = await api.get('public/countries', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching countries');
    }
};


export const getBloodGroup = async (params = {}) => {
    try {
        const response = await api.get('public/blood-groups', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching Data');
    }
};


export const getRoles = async (params = {}) => {
    try {
        const response = await api.get('public/roles-all', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching Data');
    }
};


export const getDepartments = async (params = {}) => {
    try {
        const response = await api.get('public/departments-all', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching Data');
    }
};




export const diseaseType = async (params = {}) => {
    try {
        const response = await api.get('public/disease-type', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching Data');
    }
};
export const height = async (params = {}) => {
    try {
        const response = await api.get('public/height', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching Data');
    }
};
export const weight = async (params = {}) => {
    try {
        const response = await api.get('public/weight', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching Data');
    }
};



export const getPublicCities = async (params = {}) => {
    try {
        const response = await api.get('public/cities', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching cities');
    }
}



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


export const getMaritalStatus = async (params = {}) => {
    try {
        const response = await api.get('public/marital-status', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching data');
    }
};


export const getGenders = async (params = {}) => {
    try {
        const response = await api.get('public/genders', { params });
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


export const getPublicPublication = async (params = {}) => {
    try {
        const response = await api.get('public/publications', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching Blog');
    }
};

export const getPublicOurProjects = async (params = {}) => {
    try {
        const response = await api.get('public/projects', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching projects');
    }
};


export const getPublicNotices = async (params = {}) => {
    try {
        const response = await api.get('public/notices', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching notices');
    }
};


export const getPublicTifPages = async (tipType: string | number) => {
    try {
        const response = await api.get(`public/thalassemia-page/${tipType}`);
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching TifPages');
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

export const getPublicYear = async (params = {}) => {
    try {
        const response = await api.get('public/years-list', { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching years-list');
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
        throw error.response ? error.response.data : new Error('Error fetching news');
    }
};


export const getSinglePublication = async (id: string | number) => {
    try {
        const response = await api.get(`public/publications/${id}`);
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching publications');
    }
};



export const getSingleProject = async (id: string | number) => {
    try {
        const response = await api.get(`public/projects/${id}`);
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching data');
    }
};
export const getCommitteeDetail = async (id: string | number) => {
    try {
        const response = await api.get(`public/who-we-are-page/${id}`);
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching data');
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


export const getWhoWeArePage = async (params = {}) => {
    try {
        const response = await api.get(`public/who-we-are-page`, { params });
        return response;
    } catch (error: any) {
        throw error.response ? error.response.data : new Error('Error fetching who-we-are-page');
    }
};
