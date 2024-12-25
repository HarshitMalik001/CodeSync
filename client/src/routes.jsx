import Layout from "./Layout/Layout";
import User from "./pages/UserPage/Userpage";
import JoinRoom from "./pages/JoinRoom";
import MeetRoom from "./pages/meetRoom";
import CompilerPage from "./pages/Compiler/index";

export const routes = [
    {
        path: "/",
        element: <Layout />, // Main layout component
        children: [
            {
                path: "/",
                element: <User/>, // Home page, renders User component
            },
            {
                path: "/meet-room", // JoinRoom page, rendered under /user/meet-room
                element: <JoinRoom />,
                // element: <CompilerPage />,
            },  
            {
                path: "/meet-room/:roomid", // MeetRoom page, with dynamic roomid, rendered under /user/meet-room/:roomid
                element: <MeetRoom />,
            },
            {
                path: "/compiler", // JoinRoom page, rendered under /user/meet-room
                element: <CompilerPage />,
            },
        ],
    },
];
