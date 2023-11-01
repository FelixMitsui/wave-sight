import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import RouteGroup from './router/RouteGroup';
import Suspender from './components/common/Suspender';
import ChatWindow from './components/common/ChatWindow';
import AsideGroup from './components/common/AsideGroup';
import './styles/index.scss';

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

const App = () => {

    return (
        <BrowserRouter basename='/'>
            <Header />
            <AsideGroup />
            <ChatWindow />
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
