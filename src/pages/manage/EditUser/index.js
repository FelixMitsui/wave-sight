import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { manageTypes } from "../../../redux/manageModule";
import { Table } from "react-bootstrap";
import UserTable from "../../../components/manage/UserTable";
import UserForm from "../../../components/UserForm"
const EditUser = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.manage.users)
    const [showEdit, setShowEdit] = useState(false)
    const [editValue, setEditValue] = useState()
    useEffect(() => {
        if (users.length != 0) return
        dispatch({ type: manageTypes.GET_ALL_USERS_REQUEST })
    }, [])
    const handleShowEdit = (bool, value) => {
        setShowEdit(bool)
        setEditValue(value)
    }
    const updateUser = (userInfo) => {
        dispatch({ type: manageTypes.UPDATE_USER_INFO_REQUEST, payload: userInfo })
        setShowEdit(false)
    }
    const tableItems =
        users?.map((item, index) => (
            <UserTable key={item._id}
                num={index}
                item={item}
                handleShowEdit={() => handleShowEdit(true, item)}
            />))
    return (
        <div className=" border border-1">
            <h1 style={{ fontFamily: "fantasy" }} className="mt-2 bg-gray border  text-white text-center">
                User Manage
            </h1>
            {showEdit ? (
                <UserForm value={editValue}
                    setEditValue={setEditValue}
                    updateUser={updateUser}
                    handleClose={setShowEdit} />) : (
                <Table striped bordered >
                    <tbody >
                        <tr className=" text-center font-content">
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Create Time</th>
                            <th>Edit</th>
                        </tr>
                        {tableItems}
                    </tbody>
                </Table>)
            }
        </div >
    )
}
export default EditUser