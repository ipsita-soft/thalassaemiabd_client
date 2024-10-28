// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/Home';
import { Register } from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import ClientLayout from './layouts/ClientLayout';
import UserPanelLayout from './layouts/UserPanelLayoyut.tsx';
import ProtectedRoute from './components/auth/ProtectedRoute';
import PublicRoute from './components/auth/PublicRoute.tsx';
import Unauthorized from './pages/Unauthorized'; // Import the Unauthorized page
import Logout from './components/auth/Logout.tsx';
import { PaymentPage } from './pages/sidebar/webSetting/payment/PaymentPage';
import { SliderPage } from './pages/sidebar/webSetting/slider/SliderPage';
import { ListPage } from './pages/sidebar/webSetting/blog-news/ListPage';
import { EventsPage } from './pages/sidebar/webSetting/events/EventsPage';
import { WishersPage } from './pages/sidebar/webSetting/wishers/WishersPage.tsx';
import { DoctorSliderPage } from './pages/sidebar/webSetting/doctorSlider/DoctorSliderPage.tsx';
import EventAll from './client/page/EventAll.tsx';
import SingleEvent from './client/page/SingleEvent';
import BlogNewsAll from './client/page/BlogNewsAll.tsx';
import SingleBlogNews from './client/page/SingleBlogNews.tsx';
import { GalleryPage } from './pages/sidebar/webSetting/gallery/GalleryPage.tsx';
import Gallery from './client/page/Gallery.tsx';
import VideoGallery from './client/page/VideoGallery.tsx';
import EditSetting from './pages/sidebar/webSetting/setting/EditSetting.tsx';
import VisionMission from './client/page/VisionMission.tsx';
import EditMissionVision from './pages/sidebar/webSetting/missionVision/EditMissionVision.tsx';
import AdvisorsCommittee from './client/page/AdvisorsCommittee.tsx';
import { WhoWeArePage } from './pages/sidebar/webSetting/whoWeAre/WhoWeArePage.tsx';
import ZakatBoard from './client/page/ZakatBoard.tsx';
import BloodCollectionCommittee from './client/page/BloodCollectionCommittee.tsx';
import BtsHistory from './client/page/BtsHistory.tsx';
import EditBtsHistory from './pages/sidebar/webSetting/missionVision/EditBtsHistory.tsx';
import { ProjectPage } from './pages/sidebar/webSetting/Project/ProjectPage.tsx';
import OurProjects from './client/page/OurProjects.tsx';
import ProjectDetails from './client/page/ProjectDetails.tsx';
import NoticeDetails from './client/page/NoticeDetails.tsx';
import { NoticesPage } from './pages/sidebar/webSetting/notices/NoticesPage.tsx';
import TifMembership from './client/page/TifMembership.tsx';
import { TifPage } from './pages/sidebar/webSetting/tifPage/TifPage.tsx';
import { TifSliderPage } from './pages/sidebar/webSetting/tifSlider/TifSliderPage.tsx';
import Notice from './client/userpanel/Notice.tsx';
import AnnualReports from './client/userpanel/Annualreport.tsx';
import MyProfile from './client/userpanel/MyProfile.tsx';
import UpdateProfile from './client/userpanel/UpdateProfile.tsx';
import BloodDonationHistory from './client/userpanel/bloodDonationHistory.tsx';
import HealthHistory from './client/userpanel/HealthHistory.tsx';
const router = createBrowserRouter([
  {
    path: '/',
    element: <ClientLayout />,
    children: [
      {
        path: 'events-all',
        element: <EventAll />
      },
      {
        path: 'events/:id',
        element: <SingleEvent />
      },
      {
        path: 'blog-news-all',
        element: <BlogNewsAll />
      },

      {
        path: 'our-projects',
        element: <OurProjects />
      },
      {
        path: 'page/:TifType',
        element: <TifMembership/>
      },


      {
        path: 'project-details/:id',
        element: <ProjectDetails />
      },


      {
        path: 'notice',
        element: <NoticeDetails />
      },


      {
        path: 'blog-news/:id',
        element: <SingleBlogNews />
      },
      {
        path: 'photo-gallery',
        element: <Gallery />
      },

      {
        path: 'videos-gallery',
        element: <VideoGallery />
      },
      {
        path: 'mission-vision',
        element: <VisionMission />
      },
      {
        path: 'bts-history',
        element: <BtsHistory />
      },
      {
        path: 'advisors',
        element: <AdvisorsCommittee />
      },
      {
        path: 'blood-collection-committee',
        element: <BloodCollectionCommittee />
      },
      {
        path: 'zakat-board',
        element: <ZakatBoard />
      },
    ]
  },



  {
    path: '/dashboard',
    element: <ProtectedRoute
      element={<DashboardLayout />}
      requiredRoles={['admin', 'patient']}
    />,
    children: [
      {
        path: 'home',
        element: <ProtectedRoute
          element={<HomePage />}
          requiredPermissions={['view_users', 'profile_edit']}
        />,
      },

      {
        path: 'payments',
        element: <ProtectedRoute
          element={<PaymentPage />}
          requiredPermissions={['view_users']}
        />,
      },
      {
        path: 'slider',
        element: <ProtectedRoute
          element={<SliderPage />}
          requiredPermissions={['view_users']}
        />,
      },
      {
        path: 'blog-news',
        element: <ProtectedRoute
          element={<ListPage />}
          requiredPermissions={['blogNews-all']}
        />,
      },
      {
        path: 'events',
        element: <ProtectedRoute
          element={<EventsPage />}
          requiredPermissions={['event-all']}
        />,
      },

      {
        path: 'notices',
        element: <ProtectedRoute
          element={<NoticesPage/>}
          requiredPermissions={['notice-all']}
        />,
      },



      {
        path: 'wishers',
        element: <ProtectedRoute
          element={<WishersPage />}
          requiredPermissions={['wisher-all']}
        />,
      },


      {
        path: 'doctor-sliders',
        element: <ProtectedRoute
          element={<DoctorSliderPage />}
          requiredPermissions={['doctorSlider-all']}
        />,
      },


      {
        path: 'our-projects',
        element: <ProtectedRoute
          element={<ProjectPage />}
          requiredPermissions={['projects-all']}
        />,
      },

      {
        path: '/dashboard/who-we-are',
        element: <ProtectedRoute
          element={<WhoWeArePage />}
          requiredPermissions={['whoWeAre-all']}
        />,
      },


      {
        path: 'galleries',
        element: <ProtectedRoute
          element={<GalleryPage />}
          requiredPermissions={['galleries-all']}
        />,
      },

      {
        path: 'settings/:id', // assuming you need an ID
        element: (
          <ProtectedRoute
            element={
              <EditSetting
                Id={'1'}
              />
            }
            requiredPermissions={['settings-all']}
          />
        ),
      },


      {
        path: 'mission-vision/:id', // assuming you need an ID
        element: (
          <ProtectedRoute
            element={
              <EditMissionVision
                Id={'1'}
              />
            }
            requiredPermissions={['settings-all']}
          />
        ),
      },
      {
        path: 'bts-history/:id', // assuming you need an ID
        element: (
          <ProtectedRoute
            element={
              <EditBtsHistory
                Id={'1'}
              />
            }
            requiredPermissions={['settings-all']}
          />
        ),
      },


      {
        path: 'tif-page',
        element: <ProtectedRoute
          element={<TifPage />}
          requiredPermissions={['tif-member-all']}
        />,
      },

      {
        path: 'tif-page-slider',
        element: <ProtectedRoute
          element={<TifSliderPage />}
          requiredPermissions={['tif-member-all']}
        />,
      },



      {
        path: 'home2',
        element: <ProtectedRoute
          element={<HomePage />}
          requiredPermissions={['view_dashboard']}
        />,
      },
    ],
  },
  {
    path: '/',
    element: <AuthLayout />,
    children: [
      {
        path: 'login',
        element: <PublicRoute
          element={<Login />}
          redirectTo="/dashboard/home"
        />,
      },
      {
        path: 'register',
        element: <PublicRoute
          element={<Register />}
          redirectTo="/dashboard/home"
        />,
      },
    ],
  },
  {
    path: '/logout',
    element: <Logout />,
  },
  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },

  






  {
    path: '/userpanel',
    element: <UserPanelLayout />,
    children: [
      {
        path: '/userpanel/notices',
        element: <Notice />
      },
      {
        path: '/userpanel/annual-reports',
        element: <AnnualReports />
      },
      {
        path: '/userpanel/my-profile',
        element: <MyProfile />
      },
      {
        path: '/userpanel/update-profile',
        element: <UpdateProfile />
      },

      {
        path: '/userpanel/blood-donation-history',
        element: <BloodDonationHistory/>
      },

      {
        path: '/userpanel/health-history',
        element: <HealthHistory/>
      },

    ]
  },




]);

export default router;
