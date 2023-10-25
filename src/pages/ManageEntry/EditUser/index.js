import React from 'react';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { manageTypes } from '../../../redux/manageModule';
import { Table, Row, Col } from 'react-bootstrap';
import UserTable from '../../../components/user/UserTable';
import UserEditForm from '../../../components/user/UserEditForm';
import { useEditInterface } from '../../../hooks/useEditInterface';
import BreadCrumb from '../../../components/common/BreadCrumb';

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
        dispatch({ type: manageTypes.GET_USERS_REQUEST });
    }, []);

    const handleUpdateUser = userInfo => {

        return (event) => {
            dispatch({ type: manageTypes.UPDATE_USER_REQUEST, payload: userInfo });
            handleCloseInterface();
        }
    };

    return (
        <section className="pt-3">
            <h1 className="border font-title mt-2 text-center text-white bg-gray">User Manage</h1>
            {isDisplay &&
                <UserEditForm
                    item={userValue}
                    setUserValue={setUserValue}
                    onUpdateUser={handleUpdateUser}
                    onCloseInterface={handleCloseInterface}
                />}
            <UserTable items={users} onOpenInterface={handleOpenInterface} />
        </section>
    );
};
export default EditUser;
