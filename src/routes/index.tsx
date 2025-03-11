import { createBrowserRouter } from "react-router-dom";
import { Mainlayout } from "../layouts/Mainlayout";
import { Home } from "../components/home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Mainlayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
    ],
  },
]);
