import { createBrowserRouter } from "react-router";
import RootLayout from "../layouts/RootLayout";
import Home from "../pages/Home/Home/Home";
import AllContests from "../pages/AllContests/AllContests";
import ExtraSection from "../pages/Extra/ExtraSection";

export const router = createBrowserRouter([
  {
    path: "/",
    Component : RootLayout,
    children : [
      {
        index : true,
        Component : Home
      },

      {
        path : 'all-contests',
        Component : AllContests
      },

      {
        path : 'extra',
        Component : ExtraSection
      }
    ]
  },
]);