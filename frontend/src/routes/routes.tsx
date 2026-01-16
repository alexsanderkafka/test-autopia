import { createBrowserRouter } from "react-router";
import Login from "../pages/Login.tsx";
import Home from "../pages/Home.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";
import PublicRoute from "./PublicRoute.tsx";

const router: any = createBrowserRouter([
    {
        path: "/",
        element: <PublicRoute><Login /></PublicRoute>,
    },
    {
        element: <ProtectedRoute />,
        children: [
            {
                path: "/home",
                Component: Home,
            }
        ]
    }
]);

export default router;
