import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FoldIcon from '../../../src/Icons/FoldIcon'

const UserForm = ({ value, setEditValue, updateUser, handleClose }) => {
    const {
        _id,
        user_name,
        user_email,
        user_password,
        user_address,
        user_role,
        user_status
    } = value

    const handleValue = (e) => {
        setEditValue(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    const handleStatus = (e) => {
        if (e.target.checked) {
            setValue(prev => ({ ...prev, [e.target.name]: !user_status }))
        } else {
            setValue(prev => ({ ...prev, [e.target.name]: !user_status }))
        }
    }

    return (
        <>
            <Form className='p-2'>
                <Form.Group className="mb-3 ms-2" >
                    <Form.Label className="fs-5 font-content">Name</Form.Label>
                    <Form.Label className="p-1 d-flex border border-1 border-black">{user_name}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3  ms-2" >
                    <Form.Label className="fs-5 font-content">Email</Form.Label>
                    <Form.Label className="p-1 d-flex border border-1 border-black">{user_email}</Form.Label>
                </Form.Group>
                <Form.Group className="mb-3" >
                    <Form.Label className="fs-5 font-content">Address</Form.Label>
                    <Form.Control name='user_address' value={user_address} onChange={(e) => handleValue(e)} />
                </Form.Group>
                <Form.Group className="d-flex mb-3 ms-2" >
                    <Form.Label className="fs-5 font-content">Role</Form.Label>
                    {['general', 'admin'].map((type) => (
                        <Form.Check
                            key={`inline-${type}`}
                            label={type}
                            value={type}
                            checked={user_role === type ? true : false}
                            name="user_role"
                            type="radio"
                            className="ms-2 font-content"
                            onChange={(e) => handleValue(e)}
                        />
                    ))}
                </Form.Group>
                <Form.Group className="mb-3 ms-2 d-flex" >
                    <Form.Label className="fs-5 font-content">Status</Form.Label>
                    <Form.Check
                        type="switch"
                        name='user_status'
                        className="ms-2"
                        checked={Boolean(user_status)}
                        onChange={(e) => handleStatus(e)}
                    />
                </Form.Group>
            </Form>
            <Button
                type="button"
                className="bg-gray font-btn fs-4 ms-2 mb-2"
                onClick={() => updateUser({
                    _id,
                    user_password,
                    user_role,
                    user_status,
                    user_address
                })}>
                Submit
            </Button>
            <FoldIcon
                className="position-relative  start-40"
                onClick={() => handleClose(false)}
                viewBox="0 0 18 18"
                width="33"
                height="33" />

        </>
    )
}

export default UserForm;