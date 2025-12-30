import { useQuery } from "@tanstack/react-query";
import { useApplicationContext } from "../contexts/ApplicationContextProvider.tsx";
import { adminService } from "../services/adminService.ts";

export const useAdminUsers = (page: number, size: number) => {
  const { accessToken, isUserAuthenticated } = useApplicationContext();
  const token = accessToken?.value ?? null;

  return useQuery({
    queryKey: ["admin", "users", page],
    queryFn: () => {
      if (!accessToken || !isUserAuthenticated || !token) throw new Error("Not authenticated");
      return adminService.getAllUsers(token, page, size);
    },
    enabled: !!accessToken && isUserAuthenticated,
  });
};
