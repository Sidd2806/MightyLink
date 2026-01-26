import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { RouterProvider , createRouter } from "@tanstack/react-router"
import { routeTree } from './routing/routTree.js'
const QueryClients = new QueryClient()
const router=createRouter({routeTree})
createRoot(document.getElementById("root")).render(
  <QueryClientProvider client={QueryClients}>
    {/* <App /> */}
    <RouterProvider router={router} />
  </QueryClientProvider>
);
 