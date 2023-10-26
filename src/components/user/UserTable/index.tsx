import React from 'react';
import { Table } from 'react-bootstrap';
import UserTableRow from '../UserTableRow';

const UserTable = ({ users, onOpenInterface }) => {

    return (
        <Table striped bordered hover responsive className="border-light-gray">
            <thead className="font-content fs-6 text-center">
                <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Address</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Create at</th>
                    <th>Edit</th>
                </tr>
            </thead>
            <tbody>
                {users?.map((user, index) => (
                    <UserTableRow key={user._id} user={user} number={index} onOpenInterface={onOpenInterface} />
                ))}

            </tbody>
        </Table>
    )
};
export default UserTable;
