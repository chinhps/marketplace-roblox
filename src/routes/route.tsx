import AuthLayout from "@/components/layouts/Authentication/AuthLayout";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import LoginPage from "@/pages/Auth/LoginPage";
import BuyServiceHistoryPage from "@/pages/History/BuyServiceHistoryPage";
import PurchaseHistoryPage from "@/pages/History/PurchaseHistoryPage";
import ServiceHistoryPage from "@/pages/History/ServiceHistoryPage";
import HomePage from "@/pages/HomePage";
import AccoutListPage from "@/pages/Service/Account/AccoutListPage";
import CUAccoutPage from "@/pages/Service/Account/CUAccoutPage";
import CUServicePage from "@/pages/Service/CUServicePage";
import RandomListPage from "@/pages/Service/Random/RandomListPage";
import ServiceDetailList from "@/pages/Service/ServiceDetail/ServiceDetailList";
import ServiceListPage from "@/pages/Service/ServiceListPage";
import CUShopPage from "@/pages/Shop/CUShopPage";
import ShopListPage from "@/pages/Shop/ShopListPage";
import TopRechargeListPage from "@/pages/TopRecharge/TopRechargeListPage";
import AdminListPage from "@/pages/User/AdminListPage";
import UserListPage from "@/pages/User/UserListPage";
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
        children: [
          {
            path: "",
            element: <AccoutListPage />,
          },
          {
            path: "create",
            element: <CUAccoutPage />,
          },
        ],
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
    path: "users",
    element: <DefaultLayout />,
    children: [
      {
        path: "user",
        element: <UserListPage />,
      },
      {
        path: "admin",
        element: <AdminListPage />,
      },
    ],
  },
  {
    path: "top-recharge",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <TopRechargeListPage />,
      },
    ],
  },
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: <LoginPage />,
      },
    ],
  },
  {
    path: "*",
    element: <>123</>,
  },
]);
