import { createRoot } from "react-dom/client";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RouterProvider, createRouter } from "@tanstack/react-router";
import store from "./store/store.js";
import { routeTree } from "./routing/routTree.js";
import { Provider } from "react-redux";
const queryClients = new QueryClient();
const router = createRouter({ routeTree,
  context:{
    queryClients,
    store
  }
 });
createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <QueryClientProvider client={queryClients}>
      {/* <App /> */}
      <RouterProvider router={router} />
    </QueryClientProvider>
  </Provider>,
);
