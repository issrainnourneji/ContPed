import React from "react";

// auth
import ConfirmMail from "../views/dashboard/auth/confirm-mail";
import LockScreen from "../views/dashboard/auth/lock-screen";
import Recoverpw from "../views/dashboard/auth/recoverpw";
import SignIn from "../views/dashboard/auth/sign-in";
import SignUp from "../views/dashboard/auth/sign-up";

// errors
import Error404 from "../views/dashboard/errors/error404";
import Error500 from "../views/dashboard/errors/error500";
import UiCards from "../views/dashboard/ui-kit/ui-cards";

//extrpages
import Maintenance from "../views/dashboard/extrapages/maintenance";
import ComingSoon from "../views/dashboard/extrapages/comingsoon";
import Register from "../views/dashboard/auth/register";
import Login from "../views/dashboard/auth/login";
import UsersPage from "../pages/usersPage/usersPage";
import UpdateProfilePage from "../pages/updateProfilePage/UpdateProfilePage";
import ConfirmEmail from "../views/dashboard/auth/ConfirmEmail";
import ForgetPassword from "../views/dashboard/auth/ForgetPassword";
import NewPassword from "../views/dashboard/auth/NewPassword";
import PrivateRoute from "./PrivateRoute";
import Admin from "../views/dashboard/app/admin";
import Index from "../views/dashboard/CreatePostes";
import UiButtons from "../views/dashboard/ui-kit/ui-buttons";
import Default from "../layouts/dashboard/default";

import ProfileUserPost from "../views/dashboard/profiles/ProfileUserPost";

import { DefaultRouter } from "./default-router";
import { Layout1Router } from "./layout1-router";
import Profile2 from "../views/dashboard/profiles/profile2";
import Header from "../components/partials/dashboard/HeaderStyle/header";
import Sidebar from "../components/partials/dashboard/SidebarStyle/sidebar";
import RightSidebar from "../components/partials/dashboard/SidebarStyle/rightsidebar";
import ProfileVideos from "../views/dashboard/app/profile-videos";
import ProfileEvents from "../views/dashboard/app/profile-events";
import EventDetail from "../views/dashboard/app/event-detail";
import Groups from "../views/dashboard/app/groups";
import ProfileForums from "../views/dashboard/app/profile-forum";
import AppliersTable from "../components/apliersTable";
import CompanyOffers from "../pages/offers/CompanyOffers";
import MeetsPage from "../pages/meet/MeetsPage";
import FormValidation from "../views/dashboard/from/form-validation";
import UiTypographys from "../views/dashboard/ui-kit/ui-typography";

import AddCourseComponent from "../views/dashboard/addCourse";
import UpdateCourseComponent from "../views/dashboard/updateCourse";
import CourseComponent from "../views/dashboard/course";
import AddTestComponent from "../views/dashboard/addTest";
import FormElement from "../views/dashboard/from/form-element";
import UpdateTestComponent from "../views/dashboard/updateTest";
import TestComponent from "../views/dashboard/test";
import RatingsComponentCompany from "../views/dashboard/NewComponent";
import RatingsComponentUser from "../views/dashboard/NewComponent2";
import RatingsComponentCourse from "../views/dashboard/CourseRatingComponent";


import AddCoursePage from "../pages/courses/addCourse";
import AddChapters from "../pages/courses/courseDashboard";
import ResultPage from "../pages/resut/resutPage";
import FinishedCourse from "../pages/courses/finishedCourse";

export const SimpleRouter = [
  // delete this
  {
    path: "dashboard/ui-kit/ui-cards",
    element: <UiCards />,
  },
  {
    path: "dashboard/ui-kit/ui-buttons",
    element: <UiButtons />,
  },
  {
    path: "dashboard/form/form-element",
    element: <FormElement />,
  },
  {
    path: "dashboard/ui-kit/ui-typography",
    element: <UiTypographys />,
  },
  {
    path: "dashboard/form/form-validation",
    element: <FormValidation />,
  },
  // end
  {
    path: "/",
    element: <Default />,
    children: [...DefaultRouter, ...Layout1Router],
  },
  {
    path: "/ratingsCompany/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <RatingsComponentCompany /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/ratingsCourse/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <RatingsComponentCourse/> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/ratingsUser/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <RatingsComponentUser /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/addCourse",
    element: (
      <>
        <Sidebar />
        <Header /> <AddCoursePage /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/courseDashboard/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <AddChapters /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/course/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <CourseComponent /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/updateCourse/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <UpdateCourseComponent /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/finishedCourse/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <FinishedCourse /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/addTest",
    element: (
      <>
        <Sidebar />
        <Header /> <AddTestComponent /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/updateTest/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <UpdateTestComponent /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/test/:id",
    element: (
      <>
        <Sidebar />
        <Header /> <TestComponent /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/test/:idTest/result/:idUser",
    element: (
      <>
        <Sidebar />
        <Header /> <ResultPage /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/dashboards/profiles/profile2",
    element: (
      <>
        <Sidebar />
        <Header /> <Profile2 /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/dashboards/user/:userId/profile",
    element: (
      <>
<Header /> <ProfileUserPost /> {" "}
      </>
    ),
  },
  {
    path: "/dashboards/app/profile-events",
    element: (
      <>
        <Sidebar />
        <Header /> <Groups /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/dashboards/app/offers",
    element: (
      <>
        <Sidebar />
        <Header /> <CompanyOffers /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/dashboards/app/groups",
    element: (
      <>
        <Sidebar />
        <Header /> <ProfileEvents /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/dashboards/app/meets",
    element: (
      <>
        <Sidebar />
        <Header /> <MeetsPage /> <RightSidebar />{" "}
      </>
    ),
  },
  
  {
    path: "/dashboard/app/profile-forum",
    element: (
      <>
        <Sidebar />
        <Header /> <ProfileForums /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/dashboard/app/groups/appliers/:offerId",
    element: (
      <>
        <Sidebar />
        <Header /> <AppliersTable /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/dashboard/app/groups/offers",
    element: (
      <>
        <Sidebar />
        <Header /> <CompanyOffers /> <RightSidebar />{" "}
      </>
    ),
  },
  {
    path: "/update",
    element: <UpdateProfilePage />,
  },
];

export const UserRoutes = SimpleRouter.map((e) => {
  return {
    path: e.path,
    element: <PrivateRoute>{e.element}</PrivateRoute>,
  };
});
