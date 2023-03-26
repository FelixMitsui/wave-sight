import React from "react";
import { Button } from "react-bootstrap";

const UserTable = (props) => {

    const { user_name, user_email, user_password, user_address, user_role, user_status, create_time } = props.item


    return (
        <>
            <tr className="text-center ">
                <th>{props.num + 1}</th>
                <th>{user_name}</th>
                <th>{user_email}</th>
                <th>{user_password}</th>
                <th>{user_address}</th>
                <th>{user_role}</th>
                <th>{Number(user_status)}</th>
                <th>{create_time}</th>
                <th>
                    <Button
                        type="button"
                        className='mt-2 btn-gray '
                        onClick={() => props.handleShowEdit()}
                    >
                        Modify
                    </Button>
                </th>
            </tr>
        </>
    )
}

export default UserTable