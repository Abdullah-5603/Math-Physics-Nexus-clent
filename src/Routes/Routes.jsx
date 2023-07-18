import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../Pages/Home/Home";
import MyPapers from "../Pages/Mypapers/MyPapers";
import UploadPapers from "../Pages/UploadPapers/UploadPapers";
import Login from "../Pages/Login/login";
import SignUp from "../SignUp/SignUp";

const router = createBrowserRouter([
    {
        path: "/",
        element : <Main/>,
        children: [
            {
                path: "/",
                element: <Home/>
            },
            {
                path : '/my-papers',
                element : <MyPapers/>
            },
            {
                path : '/upload-papers',
                element : <UploadPapers/>
            },
            {
                path : '/login',
                element : <Login/>
            },
            {
                path : '/sign-up',
                element: <SignUp/>
            }
        ]
    }
])

export default router;