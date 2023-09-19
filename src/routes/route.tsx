import HomePage from "@/pages/HomePage";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";
import { createBrowserRouter } from "react-router-dom";
import PromotionLayout from "@/components/layouts/PromotionLayout/PromotionLayout";
import { lazy } from "react";
// Layzy load
const AccountListPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.AccountListPage }))
);
const BuyRobuxPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.BuyRobuxPage }))
);
const GameHistoryPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.GameHistoryPage }))
);
const LoginPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.LoginPage }))
);
const LuckyBoxPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.LuckyBoxPage }))
);
const LuckyCardPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.LuckyCardPage }))
);
const LuckyWheelPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.LuckyWheelPage }))
);
const ProfilePage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.ProfilePage }))
);
const PurchaseHistoryPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.PurchaseHistoryPage }))
);
const RechargeHistoryPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.RechargeHistoryPage }))
);
const RechargePage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.RechargePage }))
);
const RegisterPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.RegisterPage }))
);
const WithdrawHistory = lazy(() =>
  import("@/pages").then((module) => ({ default: module.WithdrawHistory }))
);
const ViewAccountPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.ViewAccountPage }))
);
const WithdrawRobuxPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.WithdrawRobuxPage }))
);
const CategoryPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.CategoryPage }))
);
const WithdrawDiamondPage = lazy(() =>
  import("@/pages").then((module) => ({ default: module.WithdrawDiamondPage }))
);

import AuthLayout from "@/components/layouts/Authentication/AuthLayout";
import ProfileLayout from "@/components/layouts/Profile/ProfileLayout";
import { Helmet } from "react-helmet-async";
import { useInformationShopData } from "@/hooks/InfomationShopProvider";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeLayout banner={true} />,
    children: [
      {
        path: "/",
        element: <TitleSeo title="Trang chủ" ComponentPage={HomePage} />,
      },
    ],
  },
  // AUTH
  {
    path: "auth",
    element: <AuthLayout />,
    children: [
      {
        path: "sign-in",
        element: <TitleSeo title="Đăng nhập" ComponentPage={LoginPage} />,
      },
      {
        path: "sign-up",
        element: <TitleSeo title="Đăng ký" ComponentPage={RegisterPage} />,
      },
    ],
  },
  // ACCOUNT
  {
    path: "accounts",
    element: <HomeLayout banner={false} miniBackground="/roblox-bg.jpg" />,
    children: [
      {
        path: ":slug",
        element: (
          <TitleSeo
            title="Danh sách tài khoản"
            ComponentPage={AccountListPage}
          />
        ),
      },
      {
        path: "view/:id",
        element: (
          <TitleSeo
            title="Chi tiết tài khoản"
            ComponentPage={ViewAccountPage}
          />
        ),
      },
    ],
  },

  // PROFILE
  {
    path: "profile",
    element: <HomeLayout banner={false} />,
    children: [
      {
        path: "",
        element: <ProfileLayout />,
        children: [
          {
            path: "",
            element: (
              <TitleSeo
                title="Thông tin tài khoản"
                ComponentPage={ProfilePage}
              />
            ),
          },
          {
            path: "recharge",
            element: (
              <TitleSeo
                title="Nạp thẻ cào tự động"
                ComponentPage={RechargePage}
              />
            ),
          },
          {
            path: "withdraw",
            children: [
              {
                path: "buy-robux",
                element: (
                  <TitleSeo title="Mua Robux" ComponentPage={BuyRobuxPage} />
                ),
              },
              {
                path: "withdraw-robux",
                element: (
                  <TitleSeo
                    title="Rút Robux"
                    ComponentPage={WithdrawRobuxPage}
                  />
                ),
              },
              {
                path: "withdraw-diamond",
                element: (
                  <TitleSeo
                    title="Rút Kim cương"
                    ComponentPage={WithdrawDiamondPage}
                  />
                ),
              },
            ],
          },
          {
            path: "history",
            children: [
              {
                path: "recharges",
                element: (
                  <TitleSeo
                    title="Lịch sử nạp thẻ"
                    ComponentPage={RechargeHistoryPage}
                  />
                ),
              },
              {
                path: "purchases",
                element: (
                  <TitleSeo
                    title="Lịch sử mua tài khoản"
                    ComponentPage={PurchaseHistoryPage}
                  />
                ),
              },
              {
                path: "service",
                element: (
                  <TitleSeo
                    title="Lịch sử chơi game"
                    ComponentPage={GameHistoryPage}
                  />
                ),
              },
              {
                path: "withdraw",
                element: (
                  <TitleSeo
                    title="Lịch sử rút/mua Robux"
                    ComponentPage={WithdrawHistory}
                  />
                ),
              },
            ],
          },
        ],
      },
    ],
  },
  // Category
  {
    path: "categories",
    element: <HomeLayout banner={false} />,
    children: [
      {
        path: ":slug",
        element: <CategoryPage />,
      },
    ],
  },
  // LIST GAME
  {
    path: "game-list",
    element: <HomeLayout banner={false} />,
    children: [
      {
        path: "",
        element: <PromotionLayout />,
        children: [
          {
            path: "lucky-card",
            children: [
              {
                path: ":slug",
                element: <LuckyCardPage />,
              },
            ],
          },
          {
            path: "lucky-box",
            children: [
              {
                path: ":slug",
                element: <LuckyBoxPage />,
              },
            ],
          },
          {
            path: "lucky-wheel",
            children: [
              {
                path: ":slug",
                element: <LuckyWheelPage />,
              },
            ],
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <></>,
  },
]);

function TitleSeo({
  title,
  ComponentPage,
}: {
  title: string;
  ComponentPage: any;
}) {
  const data = useInformationShopData();
  return (
    <>
      <Helmet>
        <title>{`${title} | ${data?.data?.data.title_website || ""}`}</title>
        <link
          rel="icon"
          type="image/x-icon"
          href={data?.data?.data.information.favicon_url}
        />
        <link
          rel="shortcut icon"
          href={data?.data?.data.information.favicon_url}
          type="image/x-icon"
        />

        <meta property="og:url" content={window.location.href} />
        <meta
          property="og:title"
          content={`${title} | ${data?.data?.data.title_website || ""}`}
        />
        <meta
          name="keywords"
          content={data?.data?.data.information.keyword || ""}
        />
        <meta
          name="description"
          content={data?.data?.data.title_website || ""}
        />
      </Helmet>
      <ComponentPage />
    </>
  );
}
