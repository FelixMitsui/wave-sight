import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
    Nav,
    Navbar,
    NavDropdown,
    FormControl,
    Button,
    Container,
    Stack,
    ButtonGroup,
} from 'react-bootstrap';
import { NavLink, useMatch, useNavigate, useLocation, Link } from 'react-router-dom';
import { userTypes } from '../../../redux/userModule';
import MessageToast from '../MessageToast';
import NavDrop from '../NavDrop';
import Person from '../../user/Person';
import SearchBar from '../SearchBar';

import { MAIN_NAV_ITEMS, MANAGE_NAV_ITEMS } from './constants';
import NavButton from '../NavButton';

const Header = () => {

    const dispatch = useDispatch();

    const [isToggle, setIsToggle] = useState(false);
    const matched = useMatch('manage/*');

    const {
        info: { user_name, user_auth },
        isLogin,
        message: userMessage
    } = useSelector(state => state.user);

    const {
        message: productMessage
    } = useSelector(state => state.product);


    const loginToken = localStorage.getItem('loginToken');

    useEffect(() => {
        //After login,verify the user session.
        if (loginToken) dispatch({ type: userTypes.CHECK_USER_AUTH_REQUEST });
    }, [loginToken]);

    const handleToggleDisplay = () => {
        setIsToggle(toggle => !toggle);
    };

    const handleCheckLogin = () => {

        if (!isLogin) {
            dispatch({ type: userTypes.SET_MESSAGE_SEND, payload: 'Please login your account.' });
        }
    };

    return (
        <header>
            <Navbar
                collapseOnSelect
                expanded={isToggle}
                className="px-3 bg-light-gray border d-flex justify-content-center position-fixed start-0 top-0 end-0 index-4"
                expand="lg"
            >
                <div
                    className="me-1 nav-animation">
                    <Link to="/" className="text-light">
                        <h1 className="font-title">
                            WaveSight
                        </h1>
                    </Link>
                </div>
                <Navbar.Collapse id="navbarScroll" className="d-lg-flex justify-content-evenly">
                    <Nav className="align-items-end align-items-lg-center my-2 d-flex">
                        {!matched ?
                            <NavDrop linkGroup={MAIN_NAV_ITEMS} /> :
                            <NavDrop linkGroup={MANAGE_NAV_ITEMS} />
                        }
                    </Nav>
                    {!matched && <SearchBar />}
                </Navbar.Collapse>
                <Nav className="my-2 mb-2 flex-row ms-auto">
                    {!matched &&
                        <NavButton btnStyle="btn-light-gray " textStyle="text-black" path={`${isLogin ? "user/cart" : ""}`} onClick={handleCheckLogin}>
                            <i className="bx bxs-cart fs-3" />
                        </NavButton>
                    }
                    <Person
                        user_name={user_name}
                        user_auth={user_auth}
                        isLogin={isLogin}
                    />
                    <Navbar.Toggle
                        onClick={handleToggleDisplay}
                        aria-controls="navbarScroll"
                        className="ms-2 border border-2 border-white"
                    />
                </Nav>
            </Navbar >
            <div
                className="bottom-0 end-0 index-1 position-fixed start-0 top-0"
                onClick={handleToggleDisplay}
                style={{ display: `${isToggle ? 'block' : 'none'}` }}
            />
            {userMessage && <MessageToast message={userMessage} />}
            {productMessage && <MessageToast message={productMessage} />}
        </header>
    );
};

export default Header;
