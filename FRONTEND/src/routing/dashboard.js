import { rootRoute } from "./routTree";
import { createRootRoute } from "@tanstack/react-router";
import DashboardPage from "../pages/DashboardPage";
import { checkAuth } from "../utils/Helper";


export const dashBoard= createRootRoute({
    getParentRoute: ()=>rootRoute,
    path:"/dashBoard",
    component: DashboardPage,
    beforeLoad:checkAuth
})