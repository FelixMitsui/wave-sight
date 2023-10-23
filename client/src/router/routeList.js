
import React from 'react';
//Home routes
const HomeEntryLazy = React.lazy(() => import('../pages/HomeEntry'));
const MainLazy = React.lazy(() => import('../pages/HomeEntry/Main'));
const CartLazy = React.lazy(() => import('../pages/HomeEntry/Cart'));
const ProductsEntryLazy = React.lazy(() => import('../pages/HomeEntry/ProductsEntry'));
const DetailLazy = React.lazy(() => import('../pages/HomeEntry/ProductsEntry/Detail'));
const ProfileLazy = React.lazy(() => import('../pages/HomeEntry/Profile'));
const OrderLazy = React.lazy(() => import('../pages/HomeEntry/Order'));
const CheckoutLazy = React.lazy(() => import('../pages/HomeEntry/Checkout'));
const SearchLazy = React.lazy(() => import('../pages/HomeEntry/Search'));
//manage routes
const ManageEntryLazy = React.lazy(() => import('../pages/ManageEntry'));
const CreateLazy = React.lazy(() => import('../pages/ManageEntry/Create'));
const EditUserLazy = React.lazy(() => import('../pages/ManageEntry/EditUser'));
const EditProductLazy = React.lazy(() => import('../pages/ManageEntry/EditProduct'));

export const routes = [
    {
        path: '/',
        breadcrumbName: 'Home',
        element: <HomeEntryLazy />,
        children: [
            {
                path: '/',
                breadcrumbName: 'Main',
                element: <MainLazy />,
            },
            {
                path: 'user/cart',
                breadcrumbName: 'Cart',
                element: <CartLazy />,
            },
            {
                path: 'user/profile',
                breadcrumbName: 'Profile',
                element: <ProfileLazy />,
            },
            {
                path: 'user/order',
                breadcrumbName: 'Order',
                element: <OrderLazy />,
            },
            {
                path: 'user/checkout',
                breadcrumbName: 'Checkout',
                element: <CheckoutLazy />,
            },
            {
                path: `products`,
                breadcrumbName: 'Products',
                element: <ProductsEntryLazy />,
                children: [
                    {
                        path: `:id`,
                        breadcrumbName: `Detail`,
                        element: <DetailLazy />,
                    }
                ]
            },
            {
                path: 'search',
                breadcrumbName: 'Search',
                element: <SearchLazy />,
            },
            {
                path: '*',
                element: <MainLazy />,
            },

        ],
    },
    {
        path: '/manage',
        breadcrumbName: 'Manage',
        element: <ManageEntryLazy />,
        children: [
            {
                path: '/manage',
                breadcrumbName: 'EditUser',
                element: <EditUserLazy />,
            },
            {
                path: '/manage/products',
                breadcrumbName: 'EditProduct',
                element: <EditProductLazy />,
                children: [
                    {
                        path: ':id',
                        breadcrumbName: 'Create',
                        element: <CreateLazy />,
                    },
                ]
            },
            {
                path: '/manage/users',
                breadcrumbName: 'EditUser',
                element: <EditUserLazy />,
            },
            {
                path: '/manage/create',
                breadcrumbName: 'Create',
                element: <CreateLazy />,
            },
            {
                path: '*',
                element: <ManageEntryLazy />,
            },
        ],
    },
];
