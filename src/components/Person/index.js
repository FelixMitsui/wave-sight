/** @format */

import React, { memo } from 'react';
import { Dropdown, Badge, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import {
    LoginIcon,
    LogoutIcon,
    PersonIcon,
    RegisterIcon,
    ProfileIcon,
    ManageIcon,
    BagCheckIcon,
} from '../../../src/Icons';
import withModal from '../../HOC/withModal';
import LoginModal from '../LoginModal';
import RegisterModal from '../RegisterModal';
import { userTypes } from '../../redux/userModule';

const Person = ({ item: { user_name, user_role }, isLogin, onLogout }) => {
    const LoginWithModal = withModal(LoginModal);
    const RegisterWithModal = withModal(RegisterModal);
    return (
        <Dropdown align="end" className="index-3">
            <Dropdown.Toggle variant=" border-white border border-2">
                <PersonIcon viewBox="0 0 18 18" width="30" height="30" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="bg-light-gray mt-3 px-1 index-4">
                <div className="align-items-center d-flex flex-column">
                    <Badge bg="deep-gray" className="border-bottom font-content fs-5 mb-2 mx-1">
                        {user_name || 'Guest'}
                    </Badge>
                    {isLogin ? (
                        <>
                            {user_role === 'admin' && (
                                <div className="mt-2">
                                    <NavLink to="/manage">
                                        <Button className="border btn-deep-gray index-2 outline-light text-white">
                                            <ManageIcon viewBox="0 0 18 18" width="30" height="30" />
                                            <span className="font-btn fs-6 fw-bold">Manage</span>
                                        </Button>
                                    </NavLink>
                                </div>
                            )}
                            <div className="mt-2">
                                <NavLink to="/user/profile">
                                    <Button className="border btn-deep-gray index-2 outline-light text-white">
                                        <ProfileIcon viewBox="0 0 18 18" width="30" height="30" />
                                        <span className="font-btn fs-6 fw-bold"> Profile</span>
                                    </Button>
                                </NavLink>
                            </div>
                            <div className="mt-2">
                                <NavLink to="/user/order">
                                    <Button className="border btn-deep-gray index-2 outline-light text-white">
                                        <BagCheckIcon viewBox="0 0 18 18" width="30" height="30" />
                                        <span className="font-btn fs-6 fw-bold">Order</span>
                                    </Button>
                                </NavLink>
                            </div>
                            <div className="mt-2">
                                <Button
                                    className="border btn-deep-gray index-2 outline-light text-white"
                                    onClick={onLogout}
                                >
                                    <LogoutIcon viewBox="0 0 18 18" width="30" height="30" />
                                    <span className="font-btn fs-6 fw-bold">Logout</span>
                                </Button>
                            </div>
                        </>
                    ) : (
                        <>
                            <div className="mt-2">
                                <LoginWithModal name="Login" actionType={userTypes.LOGIN_REQUEST}>
                                    <LoginIcon viewBox="0 0 18 18" width="30" height="30" />
                                </LoginWithModal>
                            </div>
                            <div className="h-100 mt-2">
                                <RegisterWithModal name="Register" actionType={userTypes.REGISTER_REQUEST}>
                                    {' '}
                                    <RegisterIcon viewBox="0 0 18 18" width="30" height="30" />
                                </RegisterWithModal>
                            </div>
                        </>
                    )}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};

function equal(prevProps, nextProps) {
    if (prevProps.isLogin !== nextProps.isLogin) {
        return false;
    } else {
        return true;
    }
}
export default memo(Person, equal);
