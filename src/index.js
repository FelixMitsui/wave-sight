import React, { Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import './styles/index.scss';
import LiftingArrow from './components/common/LiftingArrow';
import RouteGroup from './router/RouteGroup';

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const App = () => {

    return (
        <BrowserRouter basename='/'>
            <Header />
            <LiftingArrow />
            <Suspense fallback={
                <div className="d-flex align-items-center rounded p-3 position-fixed top-50 start-45 bg-light-gray index-4 ">
                    <div className="me-2 mb-2 spinner-grow" role="status"></div>
                    <h2 className="font-title">Loading...</h2>
                </div>}>
                <RouteGroup />
            </Suspense>
            <Footer />
        </BrowserRouter>
    );
};

root.render(
    <Provider store={store}>
        <App />
    </Provider>
);
