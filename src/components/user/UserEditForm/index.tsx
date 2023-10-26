import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';


const UserEditForm = ({ user, setUserValue, onUpdateUser, onCloseInterface }) => {
    const {
        _id: user_id,
        user_name,
        user_email,
        user_address,
        user_auth,
        user_status,
    } = user;

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
        <div className="mb-2 border border-2">
            <Form onSubmit={onUpdateUser({
                user_id,
                user_auth,
                user_status,
                user_address,
            })} className="p-2  d-flex flex-column position-relative ">
                <Form.Group className="mb-3 ms-2">
                    <Form.Label className="font-content fs-5 fw-bold">Name</Form.Label>
                    <Form.Text className=" ms-2">
                        {user_name}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 ms-2">
                    <Form.Label className="font-content fs-5 fw-bold">Email</Form.Label>
                    <Form.Text className="ms-2">
                        {user_email}
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3 ms-2 d-flex " >
                    <Form.Label className="font-content fs-5 fw-bold">Address</Form.Label>
                    <Form.Control
                        name="user_address"
                        className="mx-2 "
                        value={user_address}
                        onChange={event => handleInputValue(event)}
                    />
                </Form.Group>
                <Form.Group className="mb-3 ms-2 d-flex">
                    <Form.Label className="font-content fs-5 fw-bold">Auth</Form.Label>
                    {[0, 1, 2,].map(type => (
                        <Form.Check
                            key={`inline-${type}`}
                            label={type}
                            value={type}
                            checked={user_auth === type ? true : false}
                            name="user_auth"
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
            </Form>
            <div className="my-2 d-flex justify-content-center">
                <Button
                    className="btn-deep-gray text-white"
                    onClick={() => onCloseInterface()}
                    type="button"
                > <i className="bx bxs-chevrons-up fs-4" /></Button>
            </div>
        </div>
    );
};

export default UserEditForm;
