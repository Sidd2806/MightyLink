// we are definfing all the routes of the frontend like it is homepage , auth, login etc
import { createRootRoute } from "@tanstack/react-router"
import RootLayout from "../RootLayout"
import { authRoute } from "./auth.routing"
import { homepage } from "./homepage"
import { dashBoard } from "./dashboard"


export const rootRoute=createRootRoute({
    component: RootLayout
})

export const routeTree =rootRoute.addChildren([
    authRoute,
    homepage,
    dashBoard
])