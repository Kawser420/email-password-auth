import React from 'react'
import ReactDOM from 'react-dom/client'
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import Main from './Layout/Main.jsx';
import Home from './component/Home/Home.jsx';
import Login from './component/Login/Login.jsx';
import Resister from './component/Resister/Resister.jsx';
import ResisterRBS from './component/ResisterRBS/ResisterRBS';
import ResisterBS from './component/ResisterBS/ResisterBS';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: '/',
        element: <Home></Home>,

      },
      {
        path: '/login',
        element: <Login></Login>,
      },
      {
        path: '/resister',
        element: <Resister></Resister>,
      },
      {
        path: '/resister-rbs',
        element: <ResisterRBS></ResisterRBS>,
      },
      {
        path: '/resister-bs',
        element: <ResisterBS></ResisterBS>
      }
    ]
  },
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
)
