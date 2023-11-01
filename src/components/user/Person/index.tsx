
import React, { FC, memo } from 'react';
import { Dropdown, Badge } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import withModal from '../../../HOC/withModal';
import NavButton from '../../common/NavButton';
import LoginForm from '../../common/LoginForm';
import RegisterForm from '../../common/RegisterForm';
import { User } from '../../../types/User';
import { userTypes } from '../../../redux/userModule';


type PersonProps = {
    user: Pick<User, 'user_name' | 'user_auth'>;
    isLogin: boolean;
}

const Person: FC<PersonProps> = ({ user, isLogin }) => {

    const { user_name, user_auth } = user;

    const dispatch = useDispatch();

    const LoginFormWithModal = withModal(LoginForm);

    const RegisterFormWithModal = withModal(RegisterForm);


    const handleLogout = () => {
        dispatch({ type: userTypes.LOGOUT_REQUEST });
    };

    return (
        <Dropdown align="end" className="m-1 position-relative index-5">

            <Dropdown.Toggle variant="border-white border border-2">
                <i className="bx bxs-user" />
            </Dropdown.Toggle>
            <Dropdown.Menu className="position-absolute bg-light-gray mt-3 px-1 index-4">
                <div className="position-relative align-items-center d-flex flex-column">
                    <Badge bg="deep-gray" className="border border-2 border-white font-content fs-6 mb-2 mx-1">
                        {user_name || 'Guest'}
                    </Badge>
                    {isLogin ? (
                        <>
                            {(user_auth & 1) !== 0 && (
                                <NavButton name="Manage" btnStyle="btn-deep-gray" textStyle="text-white" path="/manage">
                                    <i className="bx bxs-wrench" />
                                </NavButton>
                            )}
                            <NavButton name="Profile" btnStyle="btn-deep-gray" textStyle="text-white" path="/user/profile">
                                <i className="bx bxs-user-account" />
                            </NavButton>
                            <NavButton name="Order" btnStyle="btn-deep-gray" textStyle="text-white" path="/user/order">
                                <i className="bx bx-shopping-bag" />
                            </NavButton>
                            <NavButton name="Logout" btnStyle="btn-deep-gray" textStyle="text-white" onClick={handleLogout}>
                                <i className="bx bxs-log-out" />
                            </NavButton>
                        </>
                    ) : (
                        <>
                            <LoginFormWithModal title="Login" btnName="Login">
                                <i className="bx  bxs-log-in" />
                            </LoginFormWithModal>
                            <RegisterFormWithModal title="Register" btnName="Register">
                                <i className="bx  bx-registered" />
                            </RegisterFormWithModal>
                        </>
                    )}
                </div>
            </Dropdown.Menu>
        </Dropdown>
    );
};


export default memo(Person, compareEqual);

function compareEqual(prev, next): boolean {

    return prev.user.user_name === next.user.user_name;
}