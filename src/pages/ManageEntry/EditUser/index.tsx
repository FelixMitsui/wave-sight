import React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { manageTypes } from '../../../redux/manageModule';
import UserTable from '../../../components/user/UserTable';
import UserEditForm from '../../../components/user/UserEditForm';
import { useEditInterface } from '../../../hooks/useEditInterface';
import BreadCrumb from '../../../components/common/BreadCrumb';
import { RootState } from 'redux/store';

const EditUser = () => {

    const dispatch = useDispatch();

    const users = useSelector((state: RootState) => state.manage.users);

    const {
        isDisplay,
        value: user,
        setValue: setUserValue,
        handleOpenInterface,
        handleCloseInterface,
    } = useEditInterface();

    useEffect(() => {
        if (!users) return;
        dispatch({ type: manageTypes.GET_USERS_REQUEST });
    }, []);

    const handleUpdateUser = userInfo => {

        return () => {
            dispatch({ type: manageTypes.UPDATE_USER_REQUEST, payload: userInfo });
            handleCloseInterface();
        }
    };

    return (
        <section className="pt-3">
            <h1 className="border font-title mt-2 text-center text-white bg-gray">User Manage</h1>
            <BreadCrumb />
            {isDisplay &&
                <UserEditForm
                    user={user}
                    setUserValue={setUserValue}
                    onUpdateUser={handleUpdateUser}
                    onCloseInterface={handleCloseInterface}
                />}
            <UserTable users={users} onOpenInterface={handleOpenInterface} />
        </section>
    );
};
export default EditUser;
