import AuthPage from "../pages/AuthPage";
import { rootRoute } from "./routTree";
import { createRootRoute } from "@tanstack/react-router";


export const authRoute= createRootRoute({
    getParentRoute: ()=>rootRoute,
    path:"/auth",
    component: AuthPage
})