
import React from 'react';
import { Dropdown, Badge, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import withModal from '../../../HOC/withModal';
import NavButton from '../../common/NavButton';
import LoginForm from '../../common/LoginForm';
import RegisterForm from '../../common/RegisterForm';
import { userTypes } from '../../../redux/userModule';

const Person = ({ user_name, user_auth, isLogin }) => {

    const dispatch = useDispatch();

    const LoginFormWithModal = withModal(LoginForm);
    const RegisterFormWithModal = withModal(RegisterForm);


    const handleLogout = () => {
        dispatch({ type: userTypes.LOGOUT_REQUEST });
    };

    return (
        <Dropdown align="end" className="m-1 position-relative index-3">

            <Dropdown.Toggle variant="border-white border border-2">
                <i className="bx bxs-user fs-3" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute bg-light-gray mt-3 px-1 index-4">
                <div className="align-items-center d-flex flex-column">
                    <Badge bg="deep-gray" className="border border-2 border-white font-content fs-5 mb-2 mx-1">
                        {user_name || 'Guest'}
                    </Badge>
                    {isLogin ? (
                        <>
                            {user_auth & 1 && (
                                <NavButton name="Manage" btnStyle="btn-deep-gray" textStyle="text-white" path="/manage">
                                    <i className="bx bxs-wrench fs-3" />
                                </NavButton>
                            )}
                            <NavButton name="Profile" btnStyle="btn-deep-gray" textStyle="text-white" path="/user/profile">
                                <i className="bx bxs-user-account fs-3" />
                            </NavButton>
                            <NavButton name="Order" btnStyle="btn-deep-gray" textStyle="text-white" path="/user/order">
                                <i className="bx bx-shopping-bag fs-3" />
                            </NavButton>
                            <NavButton name="Logout" btnStyle="btn-deep-gray" textStyle="text-white" onClick={handleLogout}>
                                <i className="bx bxs-log-out fs-3" />
                            </NavButton>
                        </>
                    ) : (
                        <>
                            <LoginFormWithModal title="Login" btnName="Login" actionType={userTypes.LOGIN_REQUEST}>
                                <i className="bx  bxs-log-in fs-3" />
                            </LoginFormWithModal>
                            <RegisterFormWithModal title="Register" btnName="Register" actionType={userTypes.REGISTER_REQUEST}>
                                <i className="bx  bx-registered fs-3"></i>
                            </RegisterFormWithModal>
                        </>
                    )}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};


export default Person;
