import { getCurrentUser } from "../api/user.api";
import { login } from "../store/slice/authSlice";
import store from "../store/store";
import { redirect } from "@tanstack/react-router";
export const checkAuth = async ({ context }) => {
  try {
    const { queryClient, store } = context;
    const user = await queryClient.ensureQueryData({
      // want to fetch data outside the react component
      queryKey: ["currentUser"], // it will check in cache whether user already present or not
      queryFn: getCurrentUser,
      retry: false,
    });
    if (!user) return false;
    store.dispatch(login(user));
    const { isAuthenticated } = store.getState().auth;
    if (!isAuthenticated) return false;
    return true;
  } catch (e) {
   return redirect({ to: "/auth" });
  }
};
