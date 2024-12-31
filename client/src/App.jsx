import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { routes } from "./routes";
import 'animate.css';


export function App() {
    const router = createBrowserRouter(routes);

    return (
        <div className="min-h-screen">
            <RouterProvider router={router} />
        </div>
    );
}