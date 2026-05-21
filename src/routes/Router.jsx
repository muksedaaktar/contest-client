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
        path: "contest/:id",
        element: (
          <PrivateRoute>
            <ContestDetails />
          </PrivateRoute>
        )
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