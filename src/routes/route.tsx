import HomePage from "@/pages/HomePage";
import HomeLayout from "@/components/layouts/HomeLayout/HomeLayout";
import { createBrowserRouter } from "react-router-dom";
import PromotionLayout from "@/components/layouts/PromotionLayout/PromotionLayout";
import AuthLayout from "@/components/layouts/Authentication/AuthLayout";
import ProfileLayout from "@/components/layouts/Profile/ProfileLayout";
import { Helmet } from "react-helmet-async";
import { useInformationShopData } from "@/hooks/InfomationShopProvider";
import { lazy } from "react";
import LoginPage from "@/pages/Auth/LoginPage";
import RegisterPage from "@/pages/Auth/RegisterPage";
import UnitSellPage from "@/pages/GamePass/UnitSellPage";

// Lazy load
const AccountListPage = lazy(() => import("@/pages/Account/AccountListPage"));
const ViewAccountPage = lazy(() => import("@/pages/Account/ViewAccountPage"));

const LuckyBoxPage = lazy(() => import("@/pages/GameList/LuckyBoxPage"));
const LuckyCardPage = lazy(() => import("@/pages/GameList/LuckyCardPage"));
const LuckyWheelPage = lazy(() => import("@/pages/GameList/LuckyWheelPage"));
const CategoryPage = lazy(() => import("@/pages/GameList/CategoryPage"));

const GamePassPage = lazy(() => import("@/pages/GamePass/GamePassPage"));

const GameHistoryPage = lazy(
  () => import("@/pages/Profile/History/GameHistoryPage")
);
const WithdrawHistory = lazy(
  () => import("@/pages/Profile/History/WithdrawHistoryPage")
);
const PurchaseHistoryPage = lazy(
  () => import("@/pages/Profile/History/PurchaseHistoryPage")
);
const RechargeHistoryPage = lazy(
  () => import("@/pages/Profile/History/RechargeHistoryPage")
);

const RechargePage = lazy(
  () => import("@/pages/Profile/Recharge/RechargePage")
);
const BuyRobuxPage = lazy(
  () => import("@/pages/Profile/Withdraw/BuyRobuxPage")
);
const WithdrawRobuxPage = lazy(
  () => import("@/pages/Profile/Withdraw/WithdrawRobuxPage")
);
const WithdrawDiamondPage = lazy(
  () => import("@/pages/Profile/Withdraw/WithdrawDiamondPage")
);
const ProfilePage = lazy(() => import("@/pages/Profile/ProfilePage"));

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
    element: <HomeLayout banner={false} />,
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
  // form
  {
    path: "service-game-pass",
    element: <HomeLayout banner={false} />,
    children: [
      {
        path: "",
        element: <ProfileLayout />,
        children: [
          {
            path: ":slug",
            element: (
              <TitleSeo title="Mua Game Pass" ComponentPage={GamePassPage} />
            ),
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
  {
    path: "service",
    element: <HomeLayout banner={false} />,
    children: [
      {
        path: "units",
        children: [
          {
            path: ":slug",
            element: <UnitSellPage />,
          },
        ],
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
  return (
    <>
      <Meta title={title} />
      <ComponentPage />
    </>
  );
}

function Meta({ title }: { title: string }) {
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
    </>
  );
}
