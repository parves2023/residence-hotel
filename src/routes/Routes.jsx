import { createBrowserRouter } from "react-router-dom";
import Root from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login";
import PrivateRoute from "./PrivateRoute";
import NotFound from "../components/NotFound";
import ForgotPass from "../components/ForgotPass";
import RoomsPage from "../pages/RoomsPage/RoomsPage";
import RoomDetailsPage from "../pages/RoomDetails/RoomDetailsPage";
import MyBooking from "../pages/MyBooking/MyBooking";

//set router

const router = createBrowserRouter([
    {
        path: '/',
        element: <Root></Root>, 
        children: [
            {
                path: '/',
                element: <Home></Home>
            }, 
            {
                path: '/register',
                element: <Register></Register>
            },
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/forgotpass',
                element: <ForgotPass></ForgotPass>
            },
            {
                path: '/rooms',
                element: <RoomsPage></RoomsPage>
            },
            {
                path: '/rooms/:id',
                element: <RoomDetailsPage></RoomDetailsPage>
            },
            {
                path: '/bookings',
                element: <PrivateRoute><MyBooking></MyBooking></PrivateRoute>
            }


           
            
        ]
    },
    {
        path: "*",
        element: <NotFound></NotFound>
    }  
]);


// const router = createBrowserRouter([
//     {
//         path: '/',
//         element: <Root></Root>, 
//         children: [
//             {
//                 path: '/',
//                 element: <Home></Home>, 
//                 loader: () => fetch('/words.json')
//             }, 
//             {
//                 path: '/register',
//                 element: <Register></Register>
//             },
//             {
//                 path: '/login',
//                 element: <Login></Login>
//             },
//             {
//                 path: '/forgotpass',
//                 element: <ForgotPass></ForgotPass>
//             },
//             {
//                 path: '/add-visa',
//                 element: <PrivateRoute><AddVisa></AddVisa></PrivateRoute>
//             },
//             {
//                 path: '/my-added-visas',
//                 element: <PrivateRoute><MyVisa></MyVisa></PrivateRoute>
//             },
//             {
//                 path: '/all-visas',
//                 element: <AllVisa></AllVisa>
//             },
//             {
//                 path: '/details/:_id',
//                 element: <PrivateRoute><VisaDetails /></PrivateRoute>,
//               },
//               {
//                 path: '/my-applications',
//                 element: <PrivateRoute><MyVisaApplications /></PrivateRoute>,
//               }
            
//         ]
//     },
//     {
//         path: "*",
//         element: <NotFound></NotFound>
//     }  
// ]);

export default router;