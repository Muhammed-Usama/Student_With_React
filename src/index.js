import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import App from "./App";
import Students from "./Students/Students";
import Profile from "./Students/Profile";
import Layout from "./Layout";
import Add from "./Students/Add";
import Edit from "./Students/Edit";
import Teachers from "./Teachers/Teachers";
import AddTeacher from "./Teachers/Add";
import ProfileTeacher from "./Teachers/Profile";
import AvgTeachers from "./Teachers/AvgTeachers";
import SendNotifications from "./SendNotifications";
// import Notification from "./Notification";




const router = createBrowserRouter([
  {
    path: "/",
    element: <><Layout/><App/></> ,
     
  },
  {
    path: "Student",
    element: <><Layout/><Students/></>,
  },
  {
    path:"/student/profile/:id",
    element:<><Layout/><Profile/></>
  },{
    path:"/student/add",
    element:<><Layout/><Add/></>
  },{
    path:"/student/edit/:id",
    element:<><Layout/><Edit/></>
  },{
    path:"teacher",
    element:<><Layout/><Teachers/></>
  },{
    path:"/teacher/Create",
    element:<><Layout/><AddTeacher/></>
  },{
    path:"/teacher/profile/:id",
    element:<><Layout/><ProfileTeacher/></>
  },{
    path:"/teacher/edit/:id",
    element:<><Layout/><Edit/></>
  },{
    path:'/teacher/Avg',
    element:<><Layout/><AvgTeachers/></>
  },{
    path:"/send-notifications",
    element:<><Layout/><SendNotifications/></>
  }

]);

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <Layout />,
//     children: [
//       {
//         index: true, // This makes / the default route under Layout
//         element: <App />
//       },
//       {
//         path: "student",
//         element: <Students />,
//         children: [
//           {
//             path: "profile/:id",
//             element: <Profile />
//           },
//           {
//             path: "add",
//             element: <Add />
//           },
//           {
//             path: "edit/:id",
//             element: <Edit />
//           }
//         ]
//       }
//     ]
//   }
// ]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);