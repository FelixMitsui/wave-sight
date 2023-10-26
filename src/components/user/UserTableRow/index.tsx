import React, { FC } from "react";
import { User } from "types/User";
import { Button } from "react-bootstrap";

type TableRowProps = {
    user: User,
    number: number,
    onOpenInterface: (user: User) => void
}


const UserTableRow: FC<TableRowProps> = ({ user, number, onOpenInterface }) => {

    const { user_name, user_email, user_address, user_auth, user_status, create_at } = user;

    return (
        <tr className="font-content text-center">
            <td>{number + 1}</td>
            <td>{user_name}</td>
            <td>{user_email}</td>
            <td>{user_address}</td>
            <td>{user_auth}</td>
            <td>{Number(user_status)}</td>
            <td>{create_at}</td>
            <td>
                <Button
                    type="button"
                    size="sm"
                    className="text-white border border-2 btn-gray m-1"
                    onClick={() => onOpenInterface(user)}
                >
                    Modify
                </Button>
            </td>

        </tr>
    );
}

export default UserTableRow;