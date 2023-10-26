import React from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import Loading from '../../components/common/Loading';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/store';

export default function HomeEntry() {

    const { isLoading } = useSelector((state: RootState) => state.user)

    return (
        <>
            {isLoading && <Loading />}
            <Container className="pt-6 px-2 mb-3  min-vh-100">
                <Outlet />
            </Container>
        </>
    );
};





