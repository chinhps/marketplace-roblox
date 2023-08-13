import DefaultLayout from "@/components/layouts/DefaultLayout";
import BuyServiceHistoryPage from "@/pages/History/BuyServiceHistoryPage";
import PurchaseHistoryPage from "@/pages/History/PurchaseHistoryPage";
import ServiceHistoryPage from "@/pages/History/ServiceHistoryPage";
import HomePage from "@/pages/HomePage";
import AccoutListPage from "@/pages/Service/AccoutListPage";
import CUServicePage from "@/pages/Service/CUServicePage";
import RandomListPage from "@/pages/Service/RandomListPage";
import ServiceDetailList from "@/pages/Service/ServiceDetail/ServiceDetailList";
import ServiceListPage from "@/pages/Service/ServiceListPage";
import CUShopPage from "@/pages/Shop/CUShopPage";
import ShopListPage from "@/pages/Shop/ShopListPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <DefaultLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
    ],
  },
  {
    path: "shop-list",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <ShopListPage />,
      },
      {
        path: "create",
        element: <CUShopPage />,
      },
      {
        path: "update/:id",
        element: <CUShopPage />,
      },
    ],
  },
  {
    path: "history",
    element: <DefaultLayout />,
    children: [
      {
        path: "services",
        element: <ServiceHistoryPage />,
      },
      {
        path: "purchases",
        element: <PurchaseHistoryPage />,
      },
      {
        path: "buy-services",
        element: <BuyServiceHistoryPage />,
      },
    ],
  },
  {
    path: "services",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <ServiceListPage />,
      },
      {
        path: "accounts",
        element: <AccoutListPage />,
      },
      {
        path: "account-random",
        element: <RandomListPage />,
      },
      {
        path: "service-detail/:id",
        element: <ServiceDetailList />,
      },
      {
        path: "create",
        children: [
          {
            path: "service",
            element: <CUServicePage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <>123</>,
  },
]);
