import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { userActions } from "../../../redux/userModule";
import { Table } from "react-bootstrap";
import UserTable from "../../../components/manage/UserTable";
import UserForm from "../../../components/UserForm"
const EditUser = () => {
    const dispatch = useDispatch()
    const users = useSelector((state) => state.user.users)


    const [showEdit, setShowEdit] = useState(false)
    const [editValue, setEditValue] = useState()
    useEffect(() => {
        if (users.length != 0) {
            return
        } else {
            dispatch(userActions.getAllUsersInfo())
        }
    }, [])

    const handleShowEdit = (bool, value) => {
        setShowEdit(bool)
        setEditValue(value)

    }

    const handleUserUpdate = (vals) => {
        const userInfo = {
            userId: vals[0],
            userAddress: vals[1],
            userRole: vals[2],
            userStatus: vals[3]
        }
        dispatch(userActions.updateUserItem(userInfo))
    }

    const tableItems =
        users?.map((item, index) => (
            <UserTable key={item._id}
                num={index}
                item={item}
                handleShowEdit={() => handleShowEdit(true, item)}

            />
        ))
    return (
        <div className=" h-100 w-100">
            <h1 style={{ fontFamily: "fantasy" }} className="mt-2 bg-gray border  text-white d-flex justify-content-center">
                User Manage
            </h1>
            {showEdit ? (<UserForm value={editValue} setValue={setEditValue} handleUserUpdate={handleUserUpdate} handleClose={setShowEdit} />) : (
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center ">
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th>Status</th>
                            <th>Create Time</th>
                        </tr>
                    </thead>
                    <tbody >{tableItems}</tbody>
                </Table>)
            }
        </div >
    )
}
export default EditUser