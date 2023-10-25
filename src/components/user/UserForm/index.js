import React, { useState } from "react";
import { Form, Button, Col, Container } from "react-bootstrap";
import withModal from '../../../HOC/withModal';
import PasswordForm from '../../../components/common/PasswordForm';
import FormikGroup from "../../common/FormikGroup";
import * as Yup from 'yup';
import { Formik, Field, ErrorMessage } from 'formik';
import { userTypes } from '../../../redux/userModule';

const valuesSchema = Yup.object().shape({
    userPhone: Yup.string()
        .required('required!')
        .test('is-valid-phone', 'Invalid format!', value => {
            if (value) {
                return /^0\d{9}$/.test(value);
            }
            return false;
        })
        .min(10, 'Words cannot be less than 10!')
        .max(10, 'Words should be less than 10!'),
    userAddress: Yup.string()
        .required('required!')
        .min(6, 'Words cannot be less than 6!')
        .max(28, 'Words should be less than 28!'),
});

const UserForm = ({ infoItem }) => {


    const PasswordFormWithModal = withModal(PasswordForm);

    const [isEdit, setIsEdit] = useState(true);

    const { user_auth, user_name, user_email, user_address, user_phone } = infoItem;

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
                                <Form.Label className="font-content fs-5 fw-bold me-1 mt-1  text-center">
                                    Name
                                </Form.Label>
                                <Form.Control id="disabledTextInput" placeholder={user_name} />
                            </Form.Group>
                            <Form.Group className="my-3 mb-3 px-2">
                                <Form.Label className="font-content fs-5 fw-bold me-1 mt-1 text-center">
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
                                className="align-self-end bg-beige border border-black font-btn fs-5 fw-bold me-2 text-black"
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
                    className="mt-2 btn-deep-gray font-btn fs-5 fw-bold me-2 text-white"
                    onClick={handleEditUser}
                >
                    {isEdit ? 'Edit' : 'Cancel'}
                </Button>
                <PasswordFormWithModal
                    title="Change Password"
                    btnName="Change Password"
                    user_auth={user_auth}
                    actionType={userTypes.UPDATE_PASSWORD_REQUEST}
                    btnSize={5}
                />
            </div>
        </Container>
    )
}

export default UserForm;