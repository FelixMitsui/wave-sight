import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Routes from './router/Routes';
import NavArea from './containers/NavArea';
import FootArea from './containers/FootArea';
import './styles/index.scss';
import LiftingArrow from './containers/LiftingArrow';

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const App = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL || '/'}>
            <NavArea
                navLink={[
                    { linkName: 'Men', path: '/products/men' },
                    { linkName: 'Women', path: '/products/women' },
                    { linkName: 'Kid', path: '/products/kid' },
                    { linkName: 'Other', path: '/products/other' },
                ]}
                manageNavLink={[{ linkName: 'Create', path: '/manage/create' }]}
                manageGroupLink={[
                    { linkName: 'Users', path: '/manage/users' },
                    { linkName: 'Products', path: '/manage/products' },
                ]}
            />
            <LiftingArrow />
            <Routes />
            <FootArea />
        </BrowserRouter>
    );
};
root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
