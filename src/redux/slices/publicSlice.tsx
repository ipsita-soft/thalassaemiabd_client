import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getPublicBlogNews, getPublicSlider, getDoctorSlider, getWishers, getPublicEvent, getSingleEvent, getSingleBlogNews, getGallery, getSetting, getMissionVision, getWhoWeArePage, getBtsHistory, getPublicOurProjects, getSingleProject, getPublicNotices, getPublicTifPages, getPublicYear, getPublicPublication, getSinglePublication } from "../api/publicApi";




// Define a type for the slider objects
interface Slider {
    id: number;
    image: string;
    sorting_index: number; // Added sorting_index
    status: string;        // Added status
}
interface YearList {
    id: number;
    date: string;
    sorting_index: number; // Added sorting_index
    status: string;        // Added status
}

interface Project {
    id: number;
    image: string;
    sorting_index: number;
    status: string;
    title: string;
    description: string;
}


// Interface for TIF Slider items
interface TIFSlider {
    id: number;
    image: string;
    status: string;
    type: string;
    sorting_index: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

// Interface for TIF Attachment items
interface TIFAttachment {
    id: number;
    title: string;
    file: string;
    status: string;
    type: string;
    sorting_index: number;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
}

// Interface for the main TIF object
interface TIFPages {
    id: number;
    title: string;
    image: string;
    description: string;
    videolink: string;
    type: string;
    deleted_at: string | null;
    created_at: string;
    updated_at: string;
    tif_slider: TIFSlider[]; // Array of TIFSlider items
    yearList: YearList[]; // Array of TIFSlider items
    tif_attachment: TIFAttachment[]; // Array of TIFAttachment items
}


interface Wishers {
    id: number;
    image: string;
    sorting_index: number; // Added sorting_index
    status: string;        // Added status
}


interface Gallery {
    id: number;
    type: string;
    image: string;
    video_url: string;
    sorting_index: number; // Added sorting_index
    status: string;        // Added status
}


interface SettingData {
    website_title: string;
    slogan: string;
    email: string;
    webmail: string;
    phone: string;
    whatsapp: string;
    telephone: string;
    googlemap: string;
    websitelink: string;
    facebook: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
    copyrighttext: string;
    location: string;
    headerlogo?: string;
    footerlogo?: string;
    favicon?: string;
};



interface BlogNews {
    id: number;
    image: string;
    title: string;
    description: string;
    sorting_index: number; // Added sorting_index
    status: string;        // Added status
}

interface Meta {
    current_page: number;
    from: number;
    last_page: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
    path: string;
    per_page: number;
    to: number;
    total: number;
}

interface PubPublications {
    id: number;
    image: string;
    title: string;
    description: string;
    sorting_index: number; // Added sorting_index
    status: string;        // Added status
}

interface ApiResponse {
    data: PubPublications[];
    meta: Meta;
}

interface SingleBlogNewsResponse {
    data: BlogNews; // This is the structure of the response you receive
}
interface SinglepubPublicationsResponse {
    data: PubPublications; // This is the structure of the response you receive
}

interface Event {
    id: number;
    image: string;
    title: string;
    date: string;
    description: string;
    sorting_index: number; // Added sorting_index
    status: string;        // Added status
}
interface Notices {
    id: number;
    pdf: string;
    title: string;
    date: string;
    sorting_index: number; // Added sorting_index
    status: string;        // Added status
}

interface MissionVision {
    id: number;
    mission_title: string;
    mission_image: string;
    mission_description: string;

    vision_title: string;
    vision_image: string;
    vision_description: string;
}

interface BtsHistory {
    id: number;
    mtitle: string;
    mimage: string;
    mdescription: string;

    vtitle: string;
    vimage: string;
    vdescription: string;
}



interface SingleEventResponse {
    data: Event; // This is the structure of the response you receive
}

interface SingleSettingResponse {
    data: SettingData; // This is the structure of the response you receive
}
interface SingleMissionVision {
    data: MissionVision; // This is the structure of the response you receive
}

interface SingleBtsHistory {
    data: BtsHistory; // This is the structure of the response you receive
}
interface SingleProject {
    data: Project; // This is the structure of the response you receive
}



// Define a type for the slice state
interface PublicState {
    sliders: { data: Slider[] };
    yearList: { data: YearList[] };
    doctorSliders: { data: DoctorSliders[] };
    tifPage: TIFPages | null;
    project: { data: Project[] };
    singleProject: Project | null;
    whoWeArePage: { data: WhoWeArePage[] }
    blogNews: { data: BlogNews[] };
    singleBlogNews: BlogNews | null;
    pubPublications: { data: PubPublications[] };
    publicationDetail: PubPublications | null;
    meta: Meta | null;
    wishers: { data: Wishers[] };
    events: { data: Event[] };
    notices: { data: Notices[] };
    galleries: { data: Gallery[] }
    singleEvent: Event | null;
    setting: SettingData | null;
    missionVision: MissionVision | null;
    btsHistory: BtsHistory | null;
    isLoading: boolean;
    isError: boolean;
    error: string | null;
}


interface DoctorSliders {
    id: number;
    image: string;
    name: string;
    sorting_index: number; // Added sorting_index
    status: string;        // Added status
}


interface WhoWeArePage {
    id: number;
    image: string;
    name: string;
    designation: string;
    type: string;
    sorting_index: number;
    status: string;
}


// Initial state
const initialState: PublicState = {
    sliders: { data: [] },
    blogNews: { data: [] },
    tifPage: null,
    singleBlogNews: null,
    pubPublications: { data: [] as PubPublications[] },
    publicationDetail: null,
    meta: null as Meta | null,
    project: { data: [] },
    yearList: { data: [] },
    singleProject: null,
    doctorSliders: { data: [] },
    whoWeArePage: { data: [] },
    events: { data: [] },
    notices: { data: [] },
    singleEvent: null,
    setting: null,
    missionVision: null,
    btsHistory: null,
    wishers: { data: [] },
    galleries: { data: [] },
    isLoading: false,
    isError: false,
    error: null
};



// Async thunk to fetch the sliders
export const fetchPublicSlider = createAsyncThunk(
    'public/fetchPublicSlider',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getPublicSlider(params);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public sliders'));
        }
    }
);



export const fetchDoctorSlider = createAsyncThunk(
    'public/fetchDoctorSlider',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getDoctorSlider(params);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public sliders'));
        }
    }
);


export const fetchWhoWeArePage = createAsyncThunk(
    'public/fetchWhoWeArePage',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getWhoWeArePage(params);
            return response.data.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);


export const fetchWishers = createAsyncThunk(
    'public/fetchWishers',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getWishers(params);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);

export const fetchPublicBlogNews = createAsyncThunk(
    'public/fetchPublicBlogNews',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getPublicBlogNews(params);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public Blog News'));
        }
    }
);
export const fetchPublicPublication = createAsyncThunk(
    'public/fetchPublicPublication',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getPublicPublication(params);
            return response.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public Blog News'));
        }
    }
);
export const fetchPublicOurProjects = createAsyncThunk(
    'public/fetchPublicOurProjects',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getPublicOurProjects(params);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public data'));
        }
    }
);

export const fetchSingleProject = createAsyncThunk(
    'public/fetchSingleProject',
    async (id: string | number, { rejectWithValue }) => {
        try {
            const response = await getSingleProject(id);
            return response.data; // Assuming response contains event data
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching single event'));
        }
    }
);


export const fetchPublicGallery = createAsyncThunk(
    'public/fetchPublicGallery',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getGallery(params);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public Data'));
        }
    }
);

export const fetchSingleBlogNews = createAsyncThunk(
    'public/fetchSingleBlogNews',
    async (id: string | number, { rejectWithValue }) => {
        try {
            const response = await getSingleBlogNews(id);
            return response.data; // Assuming response contains event data
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching single event'));
        }
    }
);

export const fetchPublicationDetail = createAsyncThunk(
    'fetchPublicationDetail',
    async (id: string | number, { rejectWithValue }) => {
        try {
            const response = await getSinglePublication(id);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching single event'));
        }
    }

)

export const fetchPublicEvent = createAsyncThunk(
    'public/fetchPublicEvent',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getPublicEvent(params);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public Events'));
        }
    }
);


export const fetchPublicYearList = createAsyncThunk(
    'public/fetchPublicYearList',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getPublicYear(params);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public Events'));
        }
    }
);


export const fetchPublicNotices = createAsyncThunk(
    'public/fetchPublicNotices',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getPublicNotices(params);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public notices'));
        }
    }
);


export const fetchPublicTifPages = createAsyncThunk(
    'public/fetchPublicTifPages',
    async (tipType: string | number, { rejectWithValue }) => {
        try {
            const response = await getPublicTifPages(tipType);
            return response.data.data; // Assuming response.data contains the sliders array
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching public TifPages'));
        }
    }
);


export const fetchSingleEvent = createAsyncThunk(
    'public/fetchSingleEvent',
    async (id: string | number, { rejectWithValue }) => {
        try {
            const response = await getSingleEvent(id);
            return response.data; // Assuming response contains event data
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching single event'));
        }
    }
);



export const fetchSetting = createAsyncThunk(
    'public/fetchSetting',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getSetting(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);
export const fetchMissionVision = createAsyncThunk(
    'public/fetchMissionVision',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getMissionVision(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);

export const fetchBtsHistory = createAsyncThunk(
    'public/fetchBtsHistory',
    async (params: object = {}, { rejectWithValue }) => {
        try {
            const response = await getBtsHistory(params);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response ? error.response.data : new Error('Error fetching data'));
        }
    }
);



const publicSlice = createSlice({
    name: 'public',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchPublicSlider.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicSlider.fulfilled, (state, action: PayloadAction<Slider[]>) => {
                state.isLoading = false;
                state.sliders = { data: action.payload };
            })
            .addCase(fetchPublicSlider.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })



            //doctorSlider call 
            .addCase(fetchDoctorSlider.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchDoctorSlider.fulfilled, (state, action: PayloadAction<DoctorSliders[]>) => {
                state.isLoading = false;
                state.doctorSliders = { data: action.payload };
            })
            .addCase(fetchDoctorSlider.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

            //who we are  call 
            .addCase(fetchWhoWeArePage.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchWhoWeArePage.fulfilled, (state, action: PayloadAction<WhoWeArePage[]>) => {
                state.isLoading = false;
                state.whoWeArePage = { data: action.payload };
            })
            .addCase(fetchWhoWeArePage.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })



            //gallery  call 
            .addCase(fetchPublicGallery.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicGallery.fulfilled, (state, action: PayloadAction<Gallery[]>) => {
                state.isLoading = false;
                state.galleries = { data: action.payload };
            })
            .addCase(fetchPublicGallery.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })


            //years call 
            .addCase(fetchPublicYearList.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicYearList.fulfilled, (state, action: PayloadAction<YearList[]>) => {
                state.isLoading = false;
                state.yearList = { data: action.payload };
            })
            .addCase(fetchPublicYearList.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })


            .addCase(fetchPublicEvent.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicEvent.fulfilled, (state, action: PayloadAction<Event[]>) => {
                state.isLoading = false;
                state.events = { data: action.payload };
            })
            .addCase(fetchPublicEvent.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

            //notices call 
            .addCase(fetchPublicNotices.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicNotices.fulfilled, (state, action: PayloadAction<Notices[]>) => {
                state.isLoading = false;
                state.notices = { data: action.payload };
            })
            .addCase(fetchPublicNotices.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

            //TIF Pages call 
            .addCase(fetchPublicTifPages.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicTifPages.fulfilled, (state, action: PayloadAction<TIFPages>) => {
                state.isLoading = false;
                state.tifPage = action.payload;
            })
            .addCase(fetchPublicTifPages.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

            //single event 

            .addCase(fetchSingleProject.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchSingleProject.fulfilled, (state, action: PayloadAction<SingleProject>) => {
                state.isLoading = false;
                state.singleProject = action.payload.data;
            })
            .addCase(fetchSingleProject.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })



            .addCase(fetchSetting.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchSetting.fulfilled, (state, action: PayloadAction<SingleSettingResponse>) => {
                state.isLoading = false;
                state.setting = action.payload.data;
            })
            .addCase(fetchSetting.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })


            .addCase(fetchMissionVision.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchMissionVision.fulfilled, (state, action: PayloadAction<SingleMissionVision>) => {
                state.isLoading = false;
                state.missionVision = action.payload.data;
            })
            .addCase(fetchMissionVision.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

            .addCase(fetchBtsHistory.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchBtsHistory.fulfilled, (state, action: PayloadAction<SingleBtsHistory>) => {
                state.isLoading = false;
                state.btsHistory = action.payload.data;
            })
            .addCase(fetchBtsHistory.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })





            //wishers call 
            .addCase(fetchWishers.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchWishers.fulfilled, (state, action: PayloadAction<Wishers[]>) => {
                state.isLoading = false;
                state.wishers = { data: action.payload };
            })
            .addCase(fetchWishers.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })



            //single blog & news 

            .addCase(fetchSingleBlogNews.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchSingleBlogNews.fulfilled, (state, action: PayloadAction<SingleBlogNewsResponse>) => {
                state.isLoading = false;
                state.singleBlogNews = action.payload.data;
            })
            .addCase(fetchSingleBlogNews.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })


            //blog & news
            .addCase(fetchPublicBlogNews.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicBlogNews.fulfilled, (state, action: PayloadAction<BlogNews[]>) => {
                state.isLoading = false;
                state.blogNews = { data: action.payload };
            })
            .addCase(fetchPublicBlogNews.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })

            //fetch Public Publication

            .addCase(fetchPublicationDetail.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicationDetail.fulfilled, (state, action: PayloadAction<SinglepubPublicationsResponse>) => {
                state.isLoading = false;
                state.publicationDetail = action.payload.data;
            })
            .addCase(fetchPublicationDetail.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })



            .addCase(fetchPublicPublication.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicPublication.fulfilled, (state, action: PayloadAction<ApiResponse>) => {
                state.isLoading = false;
                state.pubPublications = { data: action.payload.data }; // Accessing the correct structure
                state.meta = action.payload.meta; // Accessing meta directly
            })
            .addCase(fetchPublicPublication.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })
            // single  OurProjects

            .addCase(fetchSingleEvent.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchSingleEvent.fulfilled, (state, action: PayloadAction<SingleEventResponse>) => {
                state.isLoading = false;
                state.singleEvent = action.payload.data;
            })
            .addCase(fetchSingleEvent.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            })


            //OurProjects
            .addCase(fetchPublicOurProjects.pending, (state) => {
                state.isLoading = true;
                state.isError = false;
                state.error = null;
            })
            .addCase(fetchPublicOurProjects.fulfilled, (state, action: PayloadAction<Project[]>) => {
                state.isLoading = false;
                state.project = { data: action.payload };
            })
            .addCase(fetchPublicOurProjects.rejected, (state, action: PayloadAction<any>) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.payload;
            });



    }
});

export default publicSlice.reducer;
