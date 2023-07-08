/** @format */

import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';

const MainFrame = () => {
    return (
        <Container className="min-vh-100 pb-1 pt-6 px-0">
            <Outlet />
        </Container>
    );
};
export default MainFrame;
