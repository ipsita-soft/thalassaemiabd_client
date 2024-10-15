// src/router.tsx
import { createBrowserRouter } from 'react-router-dom';
import Login from './pages/Login';
import HomePage from './pages/Home';
import { Register } from './pages/Register';
import DashboardLayout from './layouts/DashboardLayout';
import AuthLayout from './layouts/AuthLayout';
import ClientLayout from './layouts/ClientLayout';
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
]);

export default router;
