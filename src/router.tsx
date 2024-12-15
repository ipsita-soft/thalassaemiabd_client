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
import { TifAttachmentPage } from './pages/sidebar/webSetting/tifAttachment/TifAttachmentPage.tsx';
import { YearsPage } from './pages/sidebar/webSetting/years/YearsPage.tsx';
import Committee from './client/page/Committee.tsx';
import Founder from './client/page/Founder.tsx';
import Thalassemia from './client/page/Thalassaemia.tsx';
import PublicationSection from './client/page/PublicationSection.tsx';
import { PublicationPage } from './pages/sidebar/webSetting/publications/PublicationPage.tsx';
import PublicationDetail from './client/page/publication-detail.tsx';
import BloodDonorRegistration from './pages/BloodDonorRegistration.tsx';
import CommitteeDetails from './client/page/CommitteeDetails.tsx';
import VerifyPhone from './pages/VerifyPhone.tsx';
import VerifySms from './pages/VerifySms.tsx';
import { RolesPage } from './pages/sidebar/webSetting/roles/RolesPage.tsx';
import { RequestPage } from './pages/sidebar/webSetting/userRequest/RequestPage.tsx';
import PatientRegistration from './pages/PatientRegistration.tsx';
import { TestPage } from './pages/sidebar/webSetting/roles/TestPage.tsx';
import { BloodDonorPage } from './pages/sidebar/webSetting/bloodDonor/BloodDonorPage.tsx';
import { PatientPage } from './pages/sidebar/webSetting/patient/PatientPage';
import { UsersPage } from './pages/sidebar/webSetting/users/UsersPage.tsx';
import { MedicalHistoryPage } from './pages/sidebar/webSetting/medicalHistory/MedicalHistoryPage.tsx';
import { MedicalHistoryItemPage } from './pages/sidebar/webSetting/medicalHistoryItem/MedicalHistoryItemPage.tsx';
import { AppointmentsPage } from './pages/sidebar/webSetting/appointments/AppointmentsPage.tsx';
import { StoryListPage } from './pages/sidebar/webSetting/story/StoryListPage.tsx';
import SingleStory from './client/page/SingleStory.tsx';
import StoryAll from './client/page/StoryAll.tsx';
import { PatientMedicalHistory } from './pages/sidebar/webSetting/PatientMedicalHistory/PatientMedicalHistory';
import PatientManagement from './client/page/PatientManagement.tsx';

import ShowAppointment from './pages/sidebar/webSetting/appointments/ShowAppointment.tsx';
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
        path: 'story-all',
        element: <StoryAll />
      },
      {
        path: 'our-projects',
        element: <OurProjects />
      },
      {
        path: 'page/:TifType',
        element: <TifMembership />
      },

      {
        path: 'treatment',
        element: <PatientManagement />
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
        path: 'story/:id',
        element: <SingleStory />
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
        path: 'thalassaemia',
        element: <Thalassemia />
      },


      {
        path: 'publications',
        element: <PublicationSection />
      },
      {
        path: 'publication-details/:id',
        element: <PublicationDetail />
      },

      {
        path: 'founder',
        element: <Founder />
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
        path: 'ec-committee',
        element: <Committee />
      },

      {
        path: 'committee-details/:id',
        element: <CommitteeDetails />
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

      {
        path: 'blood-donor-registration',
        element: <PublicRoute
          element={<BloodDonorRegistration />}
        />,
      },

      {
        path: 'patient-registration',
        element: <PublicRoute
          element={<PatientRegistration />}
        />,
      },
    ]
  },



  {
    path: '/dashboard',
    element: <ProtectedRoute
      element={<DashboardLayout />}
      requiredRoles={['admin']}
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
        path: 'story',
        element: <ProtectedRoute
          element={<StoryListPage />}
          requiredPermissions={['blogNews-all']}
        />,
      },


      {
        path: 'publications',
        element: <ProtectedRoute
          element={<PublicationPage />}
          requiredPermissions={['publications-all']}
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
        path: 'roles',
        element: <ProtectedRoute
          element={<RolesPage />}
          requiredPermissions={['view_roles', 'create_role', 'edit_role', 'delete_user']}
        />,
      },

      {
        path: 'user-request',
        element: <ProtectedRoute
          element={<RequestPage />}
          requiredPermissions={[
            'user-request-list',
            'user-request-show',
            'user-request-update',
          ]}
        />,
      },

      {
        path: 'blood-donors',
        element: <ProtectedRoute
          element={<BloodDonorPage />}
          requiredPermissions={[
            'admin-blood-donor-all',
          ]}
        />,
      },

      {
        path: 'admin-patient',
        element: <ProtectedRoute
          element={<PatientPage />}
          requiredPermissions={[
            'admin-patient-all',
          ]}
        />,
      },




      {
        path: 'medical-history',
        element: <ProtectedRoute
          element={<MedicalHistoryPage />}
          requiredPermissions={[
            'medical-history-all',
          ]}
        />,
      },

      {
        path: 'medical-history-item',
        element: <ProtectedRoute
          element={<MedicalHistoryItemPage />}
          requiredPermissions={[
            'medical-history-item-all',
          ]}
        />,
      },


      {
        path: 'appointments',
        element: <ProtectedRoute
          element={<AppointmentsPage />}
          requiredPermissions={[
            'appointment-all',
          ]}
        />,
      },

      {
        path: 'show-appointment/:appointment_id',
        element: <ProtectedRoute
          element={<ShowAppointment />}
          requiredPermissions={[
            'appointment-all',
          ]}
        />,
      },

      {
        path: 'admin-user',
        element: <ProtectedRoute
          element={<UsersPage />}
          requiredPermissions={[
            'admin-user-all',
          ]}
        />,
      },



      {
        path: 'patient-medical-history/:apId/:mhId/:apDate',
        element: <ProtectedRoute
          element={<PatientMedicalHistory />}
          requiredPermissions={[
            'medical-history-item-all',
          ]}
        />,
      },



      {
        path: 'test',
        element: <ProtectedRoute
          element={<TestPage />}
          requiredPermissions={[
            'user-request-list',
            'user-request-show',
            'user-request-update',
          ]}
        />,
      },


      {
        path: 'user-rejected',
        element: <ProtectedRoute
          element={<RequestPage />}
          requiredPermissions={[
            'user-request-list',
            'user-request-show',
            'user-request-update',
          ]}
        />,
      },

      {
        path: 'user-pending',
        element: <ProtectedRoute
          element={<RequestPage />}
          requiredPermissions={[
            'user-request-list',
            'user-request-show',
            'user-request-update',
          ]}
        />,
      },

      {
        path: 'notices',
        element: <ProtectedRoute
          element={<NoticesPage />}
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
        path: 'years',
        element: <ProtectedRoute
          element={<YearsPage />}
          requiredPermissions={['years-all']}
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
        path: 'tif-page-attachment',
        element: <ProtectedRoute
          element={<TifAttachmentPage />}
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
        // redirectTo="/dashboard/home"
        />,
      },
      {
        path: 'verification-phone',
        element: <ProtectedRoute
          element={<VerifyPhone />}
        // requiredPermissions={['']}
        />,
      },
      {
        path: 'sms-verify',
        element: <ProtectedRoute
          element={<VerifySms />}
        // requiredPermissions={['']}
        />,
      },
      {
        path: 'register',
        element: <PublicRoute
          element={<Register />}
          redirectTo="/dashboard/home"
        />,
      },
      // {
      //   path: 'blood-donor-registration',
      //   element: <PublicRoute
      //     element={<BloodDonorRegistration />}
      //     // redirectTo="/dashboard/home"
      //   />,
      // },
    ],
  },


  {
    path: '/logout',
    element: <Logout />,
  },


  {
    path: '/userpanel',
    element: <ProtectedRoute
      element={<UserPanelLayout />}
      requiredRoles={['blood_donor', 'ec_committee', 'financial_donor', 'voluntary', 'patient']}
    />,
    children: [
      {
        path: '/userpanel/my-profile',
        element: (
          <ProtectedRoute
            element={
              <MyProfile />
            }
            requiredPermissions={['profile_view']}
          />
        ),
      },

      {
        path: '/userpanel/notices',
        element: <Notice />
      },
      {
        path: '/userpanel/annual-reports',
        element: <AnnualReports />
      },

      {
        path: '/userpanel/update-profile',
        element: (
          <ProtectedRoute
            element={
              <UpdateProfile />
            }
            requiredPermissions={['profile_edit']}
          />
        ),
        // element: <UpdateProfile />
      },

      {
        path: '/userpanel/blood-donation-history',
        element: <BloodDonationHistory />
      },

      {
        path: '/userpanel/health-history',
        element: <HealthHistory />
      },

    ]
  },


  {
    path: '/unauthorized',
    element: <Unauthorized />,
  },

]);

export default router;
