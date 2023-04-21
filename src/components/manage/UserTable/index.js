import React from "react";
import { Button } from "react-bootstrap";

const UserTable = (props) => {
    const { user_name, user_email, user_address, user_role, user_status, create_time } = props.item
    return (
        <>
            <tr className="text-center font-content">
                <td>{props.num + 1}</td>
                <td>{user_name}</td>
                <td>{user_email}</td>
                <td>{user_address}</td>
                <td>{user_role}</td>
                <td>{Number(user_status)}</td>
                <td>{create_time}</td>
                <Button
                    type="button"
                    size="sm"
                    className='m-1 btn-gray'
                    onClick={() => props.handleShowEdit()}
                >
                    Modify
                </Button>
            </tr>
        </>
    )
}
export default UserTable