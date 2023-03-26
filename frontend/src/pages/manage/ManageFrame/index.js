import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavArea from "../../../containers/NavArea";
import SideNavArea from "../SideNavArea";
import LoginModal from "../../../components/LoginModal";
import RegisterModal from "../../../components/RegisterModal";
import { userActions } from "../../../redux/userModule";
import { useDispatch } from "react-redux";
const ManageFrame = () => {
    const dispatch = useDispatch()
    const [show, isShow] = useState(false)
    const [isLogin, setIsLogin] = useState(false)

    const handleLogin = (vals) => {

        const userlogin = {
            email: vals[0],
            password: vals[1],
        }

        dispatch(userActions.login(userlogin))
        isShow(false)
    }

    const handleRegister = (vals) => {

        const userInfo = {
            userName: vals[0],
            email: vals[1],
            password: vals[2],
        }

        dispatch(userActions.register(userInfo))
        isShow(false)
    }

    return (
        <>
            <Container fluid className="mt-6 "  >
                <NavArea
                    loginShow={() => isShow(true)}
                    registerShow={() => isShow(true)}
                    isLogin={isLogin}
                    setIsLogin={(islogin) => setIsLogin(islogin)}
                />
                <Row className="h-100 ">
                    <Col sm={4} md={3} lg={2} className="mt-1 gray-lv3  d-flex justify-content-center"><SideNavArea /></Col>
                    <Col sm={8} md={9} lg={10} className="mt-1" ><Outlet /></Col>
                </Row>
            </Container >
            <LoginModal show={show} handleLogin={handleLogin} />
            <RegisterModal show={show} handleClose={() => isShow(false)} handleRegister={handleRegister} />
        </>
    )
}
export default ManageFrame