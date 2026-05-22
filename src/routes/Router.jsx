import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AllContests from "../pages/AllContests/AllContests";
import ExtraSection from "../pages/Extra/ExtraSection";
import AuthLayout from "../layouts/AuthLayout";
import Login from "../pages/Auth/Login/Login";
import Register from "../pages/Auth/Register/Register";
import NotFoundPage from "../pages/NotFound/NotFoundPage";
import ContestDetails from "../pages/ContestDetails/ContestDetails";
import PrivateRoute from "./PrivateRoute";
import Payment from "../pages/Payment/Payment";
import UserDashBoard from "../pages/DashBoard/UserDashboard/UserDashBoard";
import MyProfile from "../pages/DashBoard/UserDashboard/MyProfile";
import MyParcipatedContest from "../pages/DashBoard/UserDashboard/MyParcipatedContest";
import MyWinningContest from "../pages/DashBoard/UserDashboard/MyWinningContest";
import CreatorDashboard from "../pages/DashBoard/CreatorDashboard/CreatorDashboard";
import AddContest from "../pages/DashBoard/CreatorDashboard/AddContest";
import EditContest from "../pages/DashBoard/CreatorDashboard/EditContest";
import MyCreatedContest from "../pages/DashBoard/CreatorDashboard/MyCreatedContest";
import SubmittedTask from "../pages/DashBoard/CreatorDashboard/SubmittedTask";
import AdminDashboard from "../pages/DashBoard/AdminDashboard/AdminDashboard";
import ManageUsers from "../pages/DashBoard/AdminDashboard/ManageUsers";
import ManageContests from "../pages/DashBoard/AdminDashboard/ManageContests";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },

      {
        path: 'all-contests',
        Component: AllContests
      },

      {
        path: 'extra',
        Component: ExtraSection
      },

      {
        path : '/user-dashboard',
        element : (
          <PrivateRoute>
            <UserDashBoard></UserDashBoard>
          </PrivateRoute>
        )
      },

       {
        path : '/my-profile',
        element : (
          <PrivateRoute>
            <MyProfile></MyProfile>
          </PrivateRoute>
        )
      },

      {
        path : '/my-participations',
        element : (
          <PrivateRoute>
            <MyParcipatedContest></MyParcipatedContest>
          </PrivateRoute>
        )
      },

      {
        path : '/my-wins',
        element : (
          <PrivateRoute>
            <MyWinningContest></MyWinningContest>
          </PrivateRoute>
        )
      },

      {
        path : '/creator-dashboard',
        element : (
          <PrivateRoute>
            <CreatorDashboard></CreatorDashboard>
          </PrivateRoute>
        )
      },

      {
        path : '/add-contest',
        element : (
          <PrivateRoute>
           <AddContest></AddContest>
          </PrivateRoute>
        )
      },

      {
        path : '/edit-contest',
        element : (
          <PrivateRoute>
           <EditContest></EditContest>
          </PrivateRoute>
        )
      },

      {
        path : '/edit-contest/:id',
        element : (
          <PrivateRoute>
           <EditContest></EditContest>
          </PrivateRoute>
        )
      },

      {
        path : '/my-contests',
        element : (
          <PrivateRoute>
           <MyCreatedContest></MyCreatedContest>
          </PrivateRoute>
        )
      },

      {
        path : '/submit-task',
        element : (
          <PrivateRoute>
           <SubmittedTask></SubmittedTask>
          </PrivateRoute>
        )
      },

      {
        path : '/admin-dashboard',
        element : (
          <PrivateRoute>
            <AdminDashboard></AdminDashboard>
          </PrivateRoute>
        )
      },

      {
        path : '/manage-users',
        element : (
          <PrivateRoute>
            <ManageUsers></ManageUsers>
          </PrivateRoute>
        )
      },

      {
        path : '/manage-contests',
        element : (
          <PrivateRoute>
            <ManageContests></ManageContests>
          </PrivateRoute>
        )
      },

      {
        path: "contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        )
      },

      {
        path: 'payment/:id',
        Component: Payment
      }
    ]
  },

  {
    path: '/',
    Component: AuthLayout,
    children: [
      {
        path: 'login',
        Component: Login
      },

      {
        path: 'register',
        Component: Register
      },
    ]
  },


  {
    path: "*",
    Component: NotFoundPage
  }
]);