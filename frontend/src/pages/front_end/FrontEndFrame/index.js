import React, { useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavArea from "../../../containers/NavArea";
import LoginModal from "../../../components/LoginModal";
import RegisterModal from "../../../components/RegisterModal";
import { useDispatch } from "react-redux";
import { userActions } from "../../../redux/userModule";
import "../../../index"

const FrontEndFrame = () => {
    const dispatch = useDispatch()
    const [isLoginShow, setIsLoginShow] = useState(false)
    const [isRegisterShow, setIsRegisterShow] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const handleLogin = (vals) => {

        const userlogin = {
            email: vals[0],
            password: vals[1],
        }

        dispatch(userActions.login(userlogin))
        setIsLoginShow(false)
    }

    const handleRegister = (vals) => {

        const userInfo = {
            userName: vals[0],
            email: vals[1],
            password: vals[2],
        }

        dispatch(userActions.register(userInfo))
        setIsRegisterShow(false)
    }

    return (

        <>
            <NavArea
                navLink={[
                    { linkName: 'Men', path: 'product/men' },
                    { linkName: 'Women', path: 'product/women' },
                    { linkName: 'Kid', path: 'product/kid' },
                    { linkName: 'Other', path: 'product/other' }]}
                setIsLoginShow={() => setIsLoginShow(true)}
                setIsRegisterShow={() => setIsRegisterShow(true)}
                isLogin={isLogin}
                setIsLogin={(islogin) => setIsLogin(islogin)}
            />
            <Container
                className="mt-6"
            >
                <Outlet />
            </Container>
            <LoginModal show={isLoginShow} handleClose={() => setIsLoginShow(false)} handleLogin={handleLogin} />
            <RegisterModal show={isRegisterShow} handleClose={() => setIsRegisterShow(false)} handleRegister={handleRegister} />
        </>
    )


}

export default FrontEndFrame