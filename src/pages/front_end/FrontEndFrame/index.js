import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavArea from "../../../containers/NavArea";
import LoginModal from "../../../components/LoginModal";
import RegisterModal from "../../../components/RegisterModal";
import { useDispatch } from "react-redux";
import { userActions, userTypes } from "../../../redux/userModule";

const FrontEndFrame = () => {
    const dispatch = useDispatch()
    const [isLoginShow, setIsLoginShow] = useState(false)
    const [isRegisterShow, setIsRegisterShow] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const handleLogin = (userInfo) => {

        dispatch({ type: userTypes.LOGIN_REQUEST, payload: userInfo })
        setIsLoginShow(false)
    }
    const handleRegister = (userInfo) => {
        dispatch({ type: userTypes.REGISTER_REQUEST, payload: userInfo })
        setIsRegisterShow(false)
    }
    return (
        <>
            <NavArea
                navLink={[
                    { linkName: 'Men', path: '/products/men' },
                    { linkName: 'Women', path: '/products/women' },
                    { linkName: 'Kid', path: '/products/kid' },
                    { linkName: 'Other', path: '/products/other' }]}
                setIsLoginShow={() => setIsLoginShow(true)}
                setIsRegisterShow={() => setIsRegisterShow(true)}
                isLogin={isLogin}
                setIsLogin={(islogin) => setIsLogin(islogin)}
            />
            <Container className="mt-6 min-vh-100">
                <Outlet />
            </Container>
            <LoginModal show={isLoginShow} handleClose={() => setIsLoginShow(false)} handleLogin={handleLogin} />
            <RegisterModal show={isRegisterShow} handleClose={() => setIsRegisterShow(false)} handleRegister={handleRegister} />
        </>
    )
}
export default FrontEndFrame