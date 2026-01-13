import { createBrowserRouter } from "react-router";
import Login from "./Pages/Login.tsx";
import Home from "./Pages/Home.tsx";

const router: any = createBrowserRouter([
    {
        path: "/",
        Component: Login,
    },
    {
        path: "/home",
        Component: Home,
    }
]);

export default router;
