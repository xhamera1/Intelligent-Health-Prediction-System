import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useApplicationContext } from "../contexts/ApplicationContextProvider.tsx";
import { adminService } from "../services/adminService";
import type { User } from "../utils/types";

export const useAdminUpdateUser = () => {
  const queryClient = useQueryClient();
  const { accessToken, isUserAuthenticated } = useApplicationContext();
  const token = accessToken?.value ?? null;

  return useMutation({
    mutationFn: (user: User) => {
      if (!accessToken || !isUserAuthenticated || !token) throw new Error("Not authenticated");
      return adminService.updateUser(token, user.id, user);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin", "users"] });
    },
  });
};
