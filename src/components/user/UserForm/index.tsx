import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Form, Button, Container } from "react-bootstrap";
import withModal from '../../../HOC/withModal';
import PasswordForm from '../../common/PasswordForm';
import FormikGroup from "../../common/FormikGroup";
import { Formik } from 'formik';
import { userTypes } from '../../../redux/userModule';
import { valuesSchema } from "./constants";

const UserForm = ({ user }) => {

    const dispatch = useDispatch();

    const PasswordFormWithModal = withModal(PasswordForm);

    const [isEdit, setIsEdit] = useState(true);

    const { _id: user_id, user_auth, user_name, user_email, user_address, user_phone } = user;

    const initialValues = {
        userPhone: user_phone || '',
        userAddress: user_address || '',
    };

    const handleEditUser = () => {
        setIsEdit(prev => !prev);
    };

    const handleFormSubmit = formValue => {

        dispatch({
            type: userTypes.UPDATE_USER_REQUEST,
            payload: { user_id, formValue },
        });
        setIsEdit(prev => !prev);
    };

    return (
        <Container className="py-2">
            <Formik
                initialValues={initialValues}
                validationSchema={valuesSchema}
                onSubmit={handleFormSubmit}
            >
                {({ handleSubmit }) => (
                    <Form onSubmit={handleSubmit} className="m-2 px-5 d-flex flex-column">
                        <fieldset disabled>
                            <Form.Group className="my-3 mb-3 px-2">
                                <Form.Label className="me-1 mt-1 ont-content fw-bold text-center">
                                    Name
                                </Form.Label>
                                <Form.Control id="disabledTextInput" placeholder={user_name} />
                            </Form.Group>
                            <Form.Group className="my-3 mb-3 px-2">
                                <Form.Label className="me-1 mt-1 font-content fw-bold text-center">
                                    Email
                                </Form.Label>
                                <Form.Control id="disabledTextInput" placeholder={user_email} />
                            </Form.Group>
                        </fieldset>
                        <fieldset disabled={isEdit}>
                            <FormikGroup label="Phone " fieldName="userPhone">
                                {({ field }) => <Form.Control type="text" {...field} />}
                            </FormikGroup>
                            <FormikGroup label="Address " fieldName="userAddress">
                                {({ field }) => <Form.Control type="text" {...field} />}
                            </FormikGroup>
                        </fieldset>
                        {!isEdit && (
                            <Button
                                type="submit"
                                size="sm"
                                className="align-self-end bg-beige border border-black font-btn fw-bold me-2 text-black"
                            >
                                Submit
                            </Button>
                        )}
                    </Form>
                )}
            </Formik>
            <div className="d-flex justify-content-end align-items-center">
                <Button
                    type="submit"
                    size="sm"
                    className="mt-2 btn-deep-gray font-btn fw-bold me-2 text-white"
                    onClick={handleEditUser}
                >
                    {isEdit ? 'Edit' : 'Cancel'}
                </Button>
                <PasswordFormWithModal
                    title="Change Password"
                    btnName="Change Password"
                    user_auth={user_auth}
                    user_id={user_id}
                />
            </div>
        </Container>
    )
}

export default UserForm;