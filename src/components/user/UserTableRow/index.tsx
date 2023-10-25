import React, { FC } from "react";
import { Button } from "react-bootstrap";

type UserProps = {
    item: Item,
    number: number,
    onOpenInterface: (item: Item) => void
}

type Item = {
    user_name: string,
    user_email: string,
    user_address: string,
    user_auth: number,
    user_status: string,
    create_at: string
}
const UserTableRow: FC<UserProps> = ({ item, onOpenInterface, number }) => {
    const { user_name, user_email, user_address, user_auth, user_status, create_at } =
        item;

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
                    onClick={() => onOpenInterface(item)}
                >
                    Modify
                </Button>
            </td>

        </tr>
    );
}

export default UserTableRow;