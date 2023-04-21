import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import { Outlet, useNavigate } from "react-router-dom";
import NavArea from "../../../containers/NavArea";
import SideNavArea from "../SideNavArea";
import LoginModal from "../../../components/LoginModal";
import RegisterModal from "../../../components/RegisterModal";
import { userActions, userTypes } from "../../../redux/userModule";
import { useDispatch, useSelector } from "react-redux";
import { FRONTEND_URL } from "../../../util/constants/url";
const ManageFrame = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { user: { user_role } } = useSelector((state) => state.user)
    const [isLoginShow, setIsLoginShow] = useState(false)
    const [isRegisterShow, setIsRegisterShow] = useState(false)
    const [isLogin, setIsLogin] = useState(false)
    useEffect(() => {
        console.log(user_role)
        if ((user_role && user_role !== 'admin') && !isLogin) {
            navigate("/");
            return null;
        }
    }, [user_role])
    const handleLogin = (vals) => {

        const userlogin = {
            email: vals[0],
            password: vals[1],
        }
        dispatch({ type: userTypes.LOGIN_REQUEST, payload: userlogin })
        setIsLoginShow(false)
    }
    const handleRegister = (vals) => {
        const userInfo = {
            userName: vals[0],
            email: vals[1],
            password: vals[2],
        }
        dispatch({ type: userTypes.REGISTER_REQUEST, payload: userInfo })
    }
    return (
        <>
            <Container fluid className="mt-6">
                <NavArea
                    setIsLoginShow={() => setIsLoginShow(true)}
                    setIsRegisterShow={() => setIsRegisterShow(true)}
                    isLogin={isLogin}
                    setIsLogin={(islogin) => setIsLogin(islogin)}
                />
                <Row>
                    <Col sm={4} md={3} lg={2} className="mt-1  gray-lv3  d-flex justify-content-center"><SideNavArea /></Col>
                    <Col sm={8} md={9} lg={10} className=" mt-1" ><Outlet /></Col>
                </Row>
            </Container >
            <LoginModal show={isLoginShow} handleClose={() => setIsLoginShow(false)} handleLogin={handleLogin} />
            <RegisterModal show={isRegisterShow} handleClose={() => setIsRegisterShow(false)} handleRegister={handleRegister} />
        </>
    )
}
export default ManageFrame