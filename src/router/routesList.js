/** @format */

import React from 'react';

import MainFrame from '../pages/MainFrame';
import Cart from '../pages/common/Cart';
import Detail from '../pages/common/Detail';
import Home from '../pages/common/Home';
import Product from '../pages/common/Product';
import Profile from '../pages/common/Profile';
import Order from '../pages/common/Order';
import Checkout from '../pages/common/Checkout';
import Search from '../pages/common/Search';

import BackFrame from '../pages/BackFrame';
import Create from '../pages/manage/Create';
import EditUser from '../pages/manage/EditUser';
import EditProduct from '../pages/manage/EditProduct';

export const routes = [
 {
  path: '/',
  breadcrumbName: 'Home',
  element: <MainFrame />,
  children: [
   {
    path: '/',
    breadcrumbName: 'Home',
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
    path: 'user/order',
    breadcrumbName: 'Order',
    element: <Order />,
   },
   {
    path: 'user/checkout',
    breadcrumbName: 'Checkout',
    element: <Checkout />,
   },
   {
    path: 'search',
    breadcrumbName: 'Search',
    element: <Search />,
   },
   {
    path: '*',
    element: <Home />,
   },
  ],
 },
 {
  path: '/manage',
  breadcrumbName: 'Home',
  element: <BackFrame />,
  children: [
   {
    path: '/manage',
    element: <EditUser />,
   },
   {
    path: 'products',
    element: <EditProduct />,
   },
   {
    path: 'users',
    element: <EditUser />,
   },
   {
    path: 'create',
    element: <Create />,
   },
   {
    path: '*',
    element: <EditUser />,
   },
  ],
 },
];

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
