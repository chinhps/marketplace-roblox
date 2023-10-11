import AuthLayout from "@/components/layouts/Authentication/AuthLayout";
import DefaultLayout from "@/components/layouts/DefaultLayout";
import LoginPage from "@/pages/Auth/LoginPage";
import WithdrawHistoryPage from "@/pages/History/WithdrawHistoryPage";
import PurchaseHistoryPage from "@/pages/History/PurchaseHistoryPage";
import RechargeHistoryPage from "@/pages/History/RechargeHistoryPage";
import ServiceHistoryPage from "@/pages/History/ServiceHistoryPage";
import HomePage from "@/pages/HomePage";
import AccoutListPage from "@/pages/Service/Account/AccoutListPage";
import CUAccoutPage from "@/pages/Service/Account/CUAccoutPage";
import CUServicePage from "@/pages/Service/CUServicePage";
import CURandomPage from "@/pages/Service/Random/CURandomPage";
import RandomListPage from "@/pages/Service/Random/RandomListPage";
import ServiceDetailList from "@/pages/Service/ServiceDetail/ServiceDetailList";
import CUServiceGroup from "@/pages/Service/ServiceGroup/CUServiceGroup";
import ServiceListPage from "@/pages/Service/ServiceListPage";
import CUShopPage from "@/pages/Shop/CUShopPage";
import ShopListPage from "@/pages/Shop/ShopListPage";
import TopRechargeListPage from "@/pages/TopRecharge/TopRechargeListPage";
import AdminListPage from "@/pages/User/AdminListPage";
import UserDetailPage from "@/pages/User/Detail/UserDetailPage";
import UserListPage from "@/pages/User/UserListPage";
import { createBrowserRouter } from "react-router-dom";
import CUTopRechargeVirtualPage from "@/pages/TopRecharge/CUTopRechargeVirtualPage";
import PluginListPage from "@/pages/Plugin/PluginListPage";
import CUPluginPage from "@/pages/Plugin/CUPluginPage";
import CUAdminPage from "@/pages/User/CUAdminPage";
import EventListPage from "@/pages/Event/EventListPage";
import CUEventPage from "@/pages/Event/CUEventPage";

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
        path: "recharges",
        element: <RechargeHistoryPage />,
      },
      {
        path: "withdraw",
        element: <WithdrawHistoryPage />,
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
          {
            path: "update/:id",
            element: <CUAccoutPage />,
          },
        ],
      },
      {
        path: "account-random",
        children: [
          {
            path: "",
            element: <RandomListPage />,
          },
          {
            path: "create",
            element: <CURandomPage />,
          },
        ],
      },
      {
        path: "service-detail/:id",
        element: <ServiceDetailList />,
      },
      {
        path: "groups",
        children: [
          {
            path: "create",
            element: <CUServiceGroup />,
          },
          {
            path: "update/:id",
            element: <CUServiceGroup />,
          },
        ],
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
        children: [
          {
            path: "",
            element: <UserListPage />,
          },
          {
            path: ":id",
            element: <UserDetailPage />,
          },
        ],
      },
      {
        path: "admin",
        children: [
          {
            path: "",
            element: <AdminListPage />,
          },
          {
            path: "create",
            element: <CUAdminPage />,
          },
          {
            path: "update/:id",
            element: <CUAdminPage />,
          },
        ],
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
      {
        path: "create",
        element: <CUTopRechargeVirtualPage />,
      },
      {
        path: "update/:id",
        element: <CUTopRechargeVirtualPage />,
      },
    ],
  },
  {
    path: "plugins",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <PluginListPage />,
      },
      {
        path: "update/:id",
        element: <CUPluginPage />,
      },
    ],
  },
  {
    path: "events",
    element: <DefaultLayout />,
    children: [
      {
        path: "",
        element: <EventListPage />,
      },
      {
        path: "update/:id",
        element: <CUEventPage />,
      },
      {
        path: "create",
        element: <CUEventPage />,
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
