import { IInfoUserResponse } from "@/types/response/auth.type";
import { token } from "@/utils/const";
import { useQueryClient } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";

export default function IsAuthentication({
  children,
}: {
  children: React.ReactNode;
}) {
  if (!token) {
    return <Navigate to="/" replace />;
  }

  const queryClient = useQueryClient();
  const queryState = queryClient.getQueryState<IInfoUserResponse>(["user"]);

  if (queryState?.status === "error") {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
}
