import React from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import NavArea from "../../../containers/NavArea";
import { userActions, userTypes } from "../../../redux/userModule";

const FrontEndFrame = () => {

    return (
        <>
            <NavArea
                navLink={[
                    { linkName: 'Men', path: '/products/men' },
                    { linkName: 'Women', path: '/products/women' },
                    { linkName: 'Kid', path: '/products/kid' },
                    { linkName: 'Other', path: '/products/other' }]}
            />
            <Container className="pt-6 px-0 min-vh-100">
                <Outlet />
            </Container>
        </>
    )
}
export default FrontEndFrame