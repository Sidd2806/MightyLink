import { rootRoute } from "./routTree";
import { createRootRoute } from "@tanstack/react-router";
import DashboardPage from "../pages/DashboardPage";


export const dashBoard= createRootRoute({
    getParentRoute: ()=>rootRoute,
    path:"/dashBoard",
    component: DashboardPage
})