/** @format */

import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FoldIcon from '../../../src/Icons/FoldIcon';
import { Col } from 'react-bootstrap';

const UserForm = ({ item, setUserValue, onUpdateUser, onCloseInterface }) => {
    const {
        _id: user_id,
        user_name,
        user_email,
        user_address,
        user_role,
        user_status,
    } = item;

    const handleInputValue = event => {
        setUserValue(prev => ({ ...prev, [event.target.name]: event.target.value }));
    };

    const handleStatusValue = event => {
        if (event.target.checked) {
            setUserValue(prev => ({ ...prev, [event.target.name]: !user_status }));
        } else {
            setUserValue(prev => ({ ...prev, [event.target.name]: !user_status }));
        }
    };

    return (
        <Form onSubmit={onUpdateUser({
            user_id,
            user_role,
            user_status,
            user_address,
        })} className="p-2 d-flex flex-column position-relative">
            <Form.Group className="mb-3 ms-2">
                <Form.Label className="font-content fs-5 fw-bold">Name</Form.Label>
                <Form.Label className=" ms-2">
                    {user_name}
                </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 ms-2">
                <Form.Label className="font-content fs-5 fw-bold">Email</Form.Label>
                <Form.Label className="ms-2">
                    {user_email}
                </Form.Label>
            </Form.Group>
            <Form.Group className="mb-3 ms-2">
                <Form.Label className="font-content fs-5 fw-bold">Address</Form.Label>
                <Form.Control
                    name="user_address"
                    className="ms-2"
                    value={user_address}
                    onChange={event => handleInputValue(event)}
                />
            </Form.Group>
            <Form.Group className="mb-3 ms-2">
                <Form.Label className="font-content fs-5 fw-bold">Role</Form.Label>
                {['general', 'admin'].map(type => (
                    <Form.Check
                        key={`inline-${type}`}
                        label={type}
                        value={type}
                        checked={user_role === type ? true : false}
                        name="user_role"
                        type="radio"
                        className="font-content ms-2"
                        onChange={event => handleInputValue(event)}
                    />
                ))}
            </Form.Group>
            <Form.Group className="mb-3 ms-2">
                <Form.Label className="font-content fs-5 fw-bold">Status</Form.Label>
                <Form.Check
                    type="switch"
                    name="user_status"
                    className="ms-2"
                    checked={user_status}
                    onChange={event => handleStatusValue(event)}
                />
            </Form.Group>
            <Button
                type="submit"
                size="sm"
                className="btn-gray text-white font-btn fs-5 mb-2 align-self-end"
            >
                Submit
            </Button>
            <FoldIcon
                className="text-deep-gray position-relative start-50 bottom-0"
                onClick={() => onCloseInterface()}
                viewBox="0 0 18 18"
                width="33"
                height="33"
            />
        </Form>
    );
};

export default UserForm;
