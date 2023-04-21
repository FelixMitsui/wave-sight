import React, { useEffect, useState } from "react";
import { matchRoutes } from 'react-router-dom'
import { routes } from "../../../routesList";
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import { userActions, userTypes } from "../../../redux/userModule";
import BreadCrumb from "../../../components/BreadCrumb";

import { FRONTEND_URL } from "../../../util/constants/url";
import { Button } from "react-bootstrap";
import PasswordModal from "../../../components/PasswordModal";

const Profile = () => {

    const [isPasswordShow, setIsPasswordShow] = useState(false)
    const matches = matchRoutes(routes, location.pathname)
    const dispatch = useDispatch()
    const { user: {
        _id,
        user_name,
        user_email,
        user_address }
    } = useSelector((state) => state.user)

    useEffect(() => {
        if (user_name === undefined) {
            location.href = FRONTEND_URL
            alert('Please log in again!')
        }
    }, [])

    const handlePassword = (passwordInfo) => {
        dispatch({ type: userTypes.UPDATE_PASSWORD_REQUEST, payload: { _id, passwordInfo } })
        setIsPasswordShow(false)
    }
    return (
        <section>
            <BreadCrumb matches={matches} />
            <div className="bg-gray">
                <h1 className="mt-2 border text-white d-flex justify-content-center font-title">
                    Profile
                </h1>
            </div >
            <Form >
                <fieldset disabled>
                    <Form.Group className="mb-3  ">
                        <Form.Label
                            className="fw-bold fs-5 mt-1 me-1 font-content">
                            Name :
                        </Form.Label>
                        <Form.Control
                            id="disabledTextInput"
                            placeholder={user_name} />
                    </Form.Group>
                    <Form.Group className="mb-3  ">
                        <Form.Label className="fw-bold fs-5 mt-1 me-1 font-content">Email :</Form.Label>
                        <Form.Control
                            id="disabledTextInput"
                            placeholder={user_email} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label className="fw-bold fs-5 mt-1 me-1 font-content">Address :</Form.Label>
                        <Form.Control
                            id="disabledTextInput"
                            placeholder={user_address} />
                    </Form.Group>
                </fieldset>
            </Form>
            <div className="d-flex justify-content-end ">
                <Button className="btn-khaki border" onClick={() => setIsPasswordShow(true)}>Change Password</Button>
            </div>
            <PasswordModal show={isPasswordShow} handleClose={() => setIsPasswordShow(false)} handlePassword={handlePassword} />
        </section>);
}
export default Profile;