import { rootRoute } from "./routTree";
import HomePage from "../pages/HomePage";
import { createRootRoute } from "@tanstack/react-router";


export const homepage= createRootRoute({
    getParentRoute: ()=>rootRoute,
    path:"/",
    component: HomePage 
})