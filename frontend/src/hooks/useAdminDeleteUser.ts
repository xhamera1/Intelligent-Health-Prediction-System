import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApplicationContext } from "../contexts/ApplicationContextProvider.tsx";
import { adminService } from "../services/adminService";

export const useAdminDeleteUser = () => {
  const queryClient = useQueryClient();
  const { accessToken, isUserAuthenticated } = useApplicationContext();
  const token = accessToken?.value ?? null;

  return useMutation({
    mutationFn: (userId: number) => {
      if (!accessToken || !isUserAuthenticated || !token) throw new Error("Not authenticated");
      return adminService.deleteUser(token, userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};
