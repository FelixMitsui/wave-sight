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
} from 'react-bootstrap';
import { NavLink, useMatch, useNavigate, useLocation } from 'react-router-dom';
import { CartIcon, SearchIcon } from '../../../src/Icons';
import Person from '../../../src/components/Person';
import { userTypes } from '../../redux/userModule';
import MessageToast from '../../components/MessageToast';

const NavArea = props => {
    const dispatch = useDispatch();
    const searchRef = useRef();
    const location = useLocation();
    const navigate = useNavigate();
    const [isToggle, setIsToggle] = useState(false);
    const matched = useMatch('manage/*');
    const {
        info: { user_name, user_role },
        error,
        message: userMessage,
        isLogin,
    } = useSelector(state => state.user);
    const {
        message: manageMessage,
    } = useSelector(state => state.manage);

    const loginToken = localStorage.getItem('loginToken');
    useEffect(() => {
        if (loginToken) dispatch({ type: userTypes.CHECK_USER_AUTH_REQUEST });
    }, []);

    useEffect(() => {
        if (matched && !isLogin && !loginToken) {
            navigate('/');
        } else if (matched && user_role && user_role !== 'admin') {
            navigate('/');
        }
    }, [isLogin, loginToken]);

    useEffect(() => {
        window.sessionStorage.setItem('lastRoute', `/wave-sight${location.pathname}`);
    }, [location]);

    const handleToggleDisplay = () => {
        setIsToggle(toggle => !toggle);
    };

    const handleLogout = (event) => {
        dispatch({ type: userTypes.LOGOUT_REQUEST });
    };

    const handleCheckLogin = (event) => {

        if (!isLogin) {
            event.preventDefault();
            dispatch({ type: userTypes.WARNING_MESSAGE_REQUEST, payload: 'Please login your account.' });
        }
    };

    const handleSearchKeyDown = event => {
        if (event.keyCode == 13) {
            if (event.target.value === '') {
                dispatch({ type: userTypes.WARNING_MESSAGE_REQUEST, payload: 'Input cannot be empty.' });
            } else {
                navigate(`search?q=${event.target.value}`);
            }
        }
    };

    const handleSearch = () => {
        if (searchRef.current.value === '') {
            dispatch({ type: userTypes.WARNING_MESSAGE_REQUEST, payload: 'Input cannot be empty.' });
        } else {
            navigate(`search?q=${searchRef.current.value}`);
        }
    };

    return (
        <>
            <Navbar
                collapseOnSelect
                expanded={isToggle}
                className="bg-light-gray border d-flex end-0 index-2 justify-content-between position-fixed px-3 start-0 top-0"
                expand="lg"
            >
                {userMessage ? <MessageToast message={userMessage} /> : null}
                {manageMessage ? <MessageToast message={manageMessage} /> : null}
                <NavLink
                    as={NavLink}
                    to="/"
                    className="font-title me-1 nav-animation text-light"
                >
                    <h1>WaveSight</h1>
                </NavLink>
                <Navbar.Collapse id="navbarScroll" className="justify-content-around">
                    <Nav className="align-items-baseline d-flex mb-2">
                        {!matched ? (
                            props.navLink?.map((link, index) => (
                                <Nav.Item key={index}>
                                    <Nav.Link
                                        className="border-2 border-end font-nav fs-4 fw-bold mb-1 p-1 py-0 text-decoration"
                                        as={NavLink}
                                        to={link.path}
                                    >
                                        {link.linkName}
                                    </Nav.Link>
                                </Nav.Item>
                            ))
                        ) : (
                            <>
                                {props.manageNavLink?.map((link, index) => (
                                    <Nav.Item key={index}>
                                        <Nav.Link
                                            className="border-2 border-end font-nav fs-4 fw-bold py-0 text-decoration"
                                            as={NavLink}
                                            to={link.path}
                                        >
                                            {link.linkName}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))}
                                <NavDropdown
                                    title="Manage"
                                    id="nav-dropdown"
                                    menuVariant="dark"
                                    className="border-2 border-end font-nav fs-4 fw-bold ms-1 py-0 text-decoration"
                                >
                                    {props.manageGroupLink?.map((link, index) => (
                                        <NavDropdown.Item
                                            eventKey={index}
                                            className="bg-light-gray border border-1"
                                        >
                                            <Nav.Link
                                                className="font-nav fs-4 fw-bold text-decoration"
                                                as={NavLink}
                                                to={link.path}
                                            >
                                                {link.linkName}
                                            </Nav.Link>
                                        </NavDropdown.Item>
                                    ))}
                                </NavDropdown>
                            </>
                        )}
                        {!matched && (
                            <div className="d-flex ms-2 position-relative">
                                <FormControl
                                    type="search"
                                    placeholder="Search"
                                    ref={searchRef}
                                    aria-label="Search"
                                    onKeyDown={handleSearchKeyDown}
                                />
                                <Button
                                    variant="none"
                                    size="sm"
                                    className="bg-deep-gray end-1 position-absolute text-white top-5"
                                    onClick={handleSearch}
                                >
                                    <SearchIcon viewBox="0 0 18 18" width="1.5rem" height="1.5rem" />
                                </Button>
                            </div>
                        )}
                    </Nav>
                </Navbar.Collapse>
                <div className="d-flex ms-3">
                    <Stack direction="horizontal" gap={2}>
                        {!matched ? (
                            <NavLink
                                to="user/cart"
                                className="border border-2 p-1 text-black"
                                onClick={handleCheckLogin}
                            >
                                <CartIcon viewBox="0 0 18 18" width="33" height="33" />
                            </NavLink>
                        ) : null}
                        <Person
                            item={{ user_name, user_role }}
                            onLogout={handleLogout}
                            isLogin={isLogin}
                        />
                    </Stack>
                    <Navbar.Toggle
                        onClick={handleToggleDisplay}
                        aria-controls="navbarScroll"
                        className="border border-white ms-2"
                    />
                </div>
            </Navbar>
            <div
                className="bottom-0 end-0 index-1 position-fixed start-0 top-0"
                onClick={handleToggleDisplay}
                style={{ display: `${isToggle ? 'block' : 'none'} ` }}
            />
        </>
    );
};

export default NavArea;
