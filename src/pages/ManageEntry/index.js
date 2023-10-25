
import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function ManageEntry() {

    const navigate = useNavigate();

    const {
        info: { user_role },
    } = useSelector(state => state.user);

    const loginToken = localStorage.getItem('loginToken');

    useEffect(() => {
        if (user_role && user_role !== 'admin' || !loginToken) {
            navigate('/');
        }
    }, [user_role, loginToken]);

    return (
        <Container className="min-vh-100 pt-6 mt-4 p-3">
            <Outlet />
        </Container>
    );
};

