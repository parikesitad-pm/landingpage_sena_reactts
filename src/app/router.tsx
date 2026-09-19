import { createBrowserRouter } from "react-router-dom";
import HomePage from "@/pages/HomePage";
import BrandPage from "@/pages/BrandPage";
import NotFoundPage from "@/pages/NotFoundPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/:lang",
    element: <HomePage />,
  },
  {
    path: "/:lang/brand",
    element: <BrandPage />,
  },
  {
    path: "/brand",
    element: <BrandPage />,
  },
  {
    path: "/the-logo",
    element: <BrandPage />,
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);
