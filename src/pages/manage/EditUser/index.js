import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { manageTypes } from '../../../redux/manageModule';
import { Table, Row, Col } from 'react-bootstrap';
import UserTable from '../../../components/UserTable';
import UserForm from '../../../components/UserForm';
import { useEditInterface } from '../../../hooks/useEditInterface';

const EditUser = () => {
    const dispatch = useDispatch();
    const users = useSelector(state => state.manage.users);
    const {
        isDisplay,
        value: userValue,
        setValue: setUserValue,
        handleOpenInterface,
        handleCloseInterface,
    } = useEditInterface();

    useEffect(() => {
        if (!users) return;
        dispatch({ type: manageTypes.GET_ALL_USERS_REQUEST });
    }, []);

    const handleUpdateUser = userInfo => {
        return (event) => {
            dispatch({ type: manageTypes.UPDATE_USER_REQUEST, payload: userInfo });
            handleCloseInterface();
        }
    };

    return (
        <>
            <div className="bg-gray">
                <h1 className="border font-title mt-2 text-center text-white">User Manage</h1>
            </div>
            <Row className="m-2 min-vh-100 p-2">
                {isDisplay ? (
                    <Col className="d-flex justify-content-center">
                        <UserForm
                            item={userValue}
                            setUserValue={setUserValue}
                            onUpdateUser={handleUpdateUser}
                            onCloseInterface={handleCloseInterface}
                        />
                    </Col>
                ) : null}
                <Col >
                    <UserTable items={users} onOpenInterface={handleOpenInterface} />
                </Col>
            </Row>
        </>
    );
};
export default EditUser;
