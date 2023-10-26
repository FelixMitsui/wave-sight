import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import './styles/index.scss';
import LiftingArrow from './components/common/LiftingArrow';
import RouteGroup from './router/RouteGroup';
import Suspender from './components/common/Suspender';

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const App = () => {

    return (
        <BrowserRouter basename='/'>
            <Header />
            <LiftingArrow />
            <Suspender>
                <RouteGroup />
            </Suspender>
            <Footer />
        </BrowserRouter>
    );
};

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
