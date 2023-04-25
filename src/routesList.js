import React from "react"

import Cart from "../src/pages/front_end/Cart"
import Detail from "../src/pages/front_end/Detail"
import Home from "../src/pages/front_end/Home"
import FrontEndFrame from "../src/pages/front_end/FrontEndFrame"
import Product from "../src/pages/front_end/Product"
import Profile from "../src/pages/front_end/Profile"
import Search from "../src/pages/front_end/Search"

import Create from "../src/pages/manage/Create"
import ManageFrame from "../src/pages/manage/ManageFrame"
import EditUser from "../src/pages/manage/EditUser"
import EditProduct from "../src/pages/manage/EditProduct"

const pathName = location.pathname

export const routes = [
    {
        path: process.env.PUBLIC_URL + '/',
        breadcrumbName: 'Home',
        element: <FrontEndFrame />,
        children: [
            {
                path: '/',
                element: <Home />,

            },
            {
                path: 'user/cart',
                breadcrumbName: 'Cart',
                element: <Cart />,

            },
            {
                path: 'user/profile',
                breadcrumbName: 'Profile',
                element: <Profile />,

            },
            {
                path: '/search',
                breadcrumbName: 'search',
                element: <Search />,

            },

        ]
    },
    {
        path: process.env.PUBLIC_URL + '/manage',
        breadcrumbName: 'Home',
        element: <ManageFrame />,
        children: [
            {
                path: '/manage',
                element: <EditUser />,

            },
            {
                path: '/manage/products',
                element: <EditProduct />,

            },
            {
                path: '/manage/users',
                element: <EditUser />,

            },
            {
                path: '/manage/create',
                element: <Create />,

            },
        ]
    },
    {
        path: "*",
        element: <FrontEndFrame />,
    }
]

let categoryArray = ['men', 'women', 'kid', 'other'];

categoryArray.forEach(category => {
    const productRoute = {
        key: category,
        path: `/products/${category}`,
        breadcrumbName: category,
        element: <Product />,
        children: [
            {
                path: `:id`,
                breadcrumbName: 'Detail',
                element: <Detail />,
            },
        ],
    };

    routes[0].children.push(productRoute);
});

