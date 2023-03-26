import React, { useEffect } from "react";
import { matchRoutes } from 'react-router-dom'
import { routes } from "../../../routesList";
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from "react-redux";
import { userActions } from "../../../redux/userModule";
import BreadCrumb from "../../../components/BreadCrumb";
import { FRONTEND_URL } from "../../../util/constants/url";
const Profile = () => {

    const matches = matchRoutes(routes, location.pathname)
    const dispatch = useDispatch()
    const { user: {
        user_role,
        user_name,
        user_email,
        user_address }
    } = useSelector((state) => state.user)

    useEffect(() => {
        if (user_name === undefined) {
            location.href = FRONTEND_URL
            alert("請重新登入!")
        }
    }, [])

    return (
        <>
            <BreadCrumb matches={matches} />
            <div className="bg-gray">
                <h1 style={{ fontFamily: "fantasy" }}
                    className="mt-2 border  text-white d-flex justify-content-center">
                    Profile
                </h1>
            </div >
            <Form >
                <fieldset disabled>
                    <Form.Group className="mb-3 d-flex justify-content-center">
                        <Form.Label className="fw-bold fs-5 mt-1 me-1">Role</Form.Label>
                        <Form.Control
                            id="disabledTextInput"
                            className="w-50"
                            placeholder={user_role} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex justify-content-center">
                        <Form.Label
                            className="fw-bold fs-5 mt-1 me-1">
                            Name
                        </Form.Label>
                        <Form.Control
                            id="disabledTextInput"
                            className="w-50"
                            placeholder={user_name} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex justify-content-center">
                        <Form.Label className="fw-bold fs-5 mt-1 me-1">Email</Form.Label>
                        <Form.Control
                            id="disabledTextInput"
                            className="w-50"
                            placeholder={user_email} />
                    </Form.Group>
                    <Form.Group className="mb-3 d-flex justify-content-center">
                        <Form.Label className="fw-bold fs-5 mt-1 me-1">Address</Form.Label>
                        <Form.Control
                            id="disabledTextInput"
                            className="w-50"
                            placeholder={user_address} />
                    </Form.Group>
                </fieldset>
            </Form>
        </>);
}
export default Profile;