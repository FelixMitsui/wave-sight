
import React from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import getCurrentTime from '../../../utils/tools/getCurrentTime';
import {
    Form,
    Row,
    Col,
    Dropdown,
    DropdownButton,
    InputGroup,
    Button,
} from 'react-bootstrap';
import { userTypes } from '../../../redux/userModule';

const shortid = require('shortid');

type FormProps = {
    userInfo: UserInfo;
};

type UserInfo = {
    _id?: string;
    user_name: string;
    user_email: string;
    user_phone: string;
    user_address: string;
    shopping_cart: Array<object>;
};

type FormValues = {
    userName: string;
    userEmail: string;
    userAddress: string;
    userPhone: number;
    deliveryMethod: string;
    payMethod: string;
    remark?: string;
    invoice?: object | string;
};

const valuesSchema = Yup.object().shape({
    userName: Yup.string()
        .required('required!')
        .min(3, 'Words cannot be less than 3!')
        .max(15, 'Words should be less than 15!'),
    userEmail: Yup.string()
        .required('required!')
        .email('Invalid format!')
        .min(12, 'Words cannot be less than 12!')
        .max(26, 'Words should be less than 26!'),
    userAddress: Yup.string()
        .required('required!')
        .min(6, 'Words cannot be less than 6!')
        .max(30, 'Words should be less than 30!'),
    userPhone: Yup.string()
        .required('Required!')
        .test('is-valid-phone', 'Invalid format!', value => {
            if (value) {
                return /^0\d{9}$/.test(value);
            }
            return false;
        })
        .min(10, 'Words cannot be less than 10!')
        .max(10, 'Words should be less than 10!'),
    deliveryMethod: Yup.string().required('required!'),
    payMethod: Yup.string().required('required!'),
    remark: Yup.string().max(25, 'Words should be less than 30!'),
    invoice: Yup.object().shape({
        type: Yup.string().required('required!!'),
        number: Yup.string().when('type', {
            is: 'Paper invoice',
            then: Yup.string().notRequired(),
            otherwise: Yup.string()
                .required('required!')
                .min(8, 'Words cannot be less than 8!')
                .max(12, 'Words should be less than 12!'),
        }),
    }),
});
const CheckoutForm: React.FC<FormProps> = ({ userInfo }) => {

    const navigate = useNavigate();
    const {
        _id: user_id,
        user_address,
        user_email,
        user_name,
        user_phone,
        shopping_cart,
    } = userInfo || {};
    const dispatch = useDispatch();
    const initialValues: FormValues = {
        userName: '',
        userEmail: '',
        userAddress: '',
        userPhone: null,
        deliveryMethod: '',
        payMethod: '',
        remark: '',
        invoice: { type: '', number: '' },
    };

    const handleShowUserInfo = (isChecked: boolean, setFieldValue: any): void => {
        const fieldValues = [
            { key: 'userName', value: user_name },
            { key: 'userEmail', value: user_email },
            { key: 'userPhone', value: user_phone },
            { key: 'userAddress', value: user_address },
        ];
        if (isChecked) {
            fieldValues.forEach(field => {
                setFieldValue(field.key, field.value);
            });
        } else {
            fieldValues.forEach(field => {
                setFieldValue(field.key, '');
            });
        }
    };

    const handleFormSubmit = (formValue: object): void => {
        const order_date = getCurrentTime();
        const combineValue = {
            user_id,
            order_id: shortid.generate(),
            shopping_cart,
            order_status: 'Processing',
            order_date,
            ...formValue,
        };
        dispatch({ type: userTypes.CREATE_ORDER_REQUEST, payload: combineValue });
        navigate('/user/order');
    };

    return (
        <Col className="border my-2">
            <Formik
                initialValues={initialValues}
                validationSchema={valuesSchema}
                onSubmit={handleFormSubmit}
                enableReinitialize
            >
                {({ handleSubmit, setFieldValue, values }) => (
                    <Form className="d-flex flex-column p-3" onSubmit={handleSubmit}>
                        <Form.Label as="h3" className="border-bottom font-title text-center">
                            Receiver
                        </Form.Label>
                        <Row className="justify-items-center">
                            <Form.Group as={Col} lg="6" className="my-2">
                                <Form.Label className="font-content">Full Name</Form.Label>
                                <Field name="userName">
                                    {({ field }) => (
                                        <Form.Control type="text" placeholder="Name" {...field}></Form.Control>
                                    )}
                                </Field>
                                <ErrorMessage name="userName">
                                    {error => (
                                        <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                    )}
                                </ErrorMessage>
                            </Form.Group>
                            <Form.Group as={Col} lg="6" className="my-2">
                                <Form.Label className="font-content">Email</Form.Label>
                                <Field name="userEmail">
                                    {({ field }) => (
                                        <Form.Control type="text" placeholder="Email" {...field}></Form.Control>
                                    )}
                                </Field>
                                <ErrorMessage name="userEmail">
                                    {error => (
                                        <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                    )}
                                </ErrorMessage>
                            </Form.Group>

                            <Form.Group as={Col} lg="6" className="my-2">
                                <Form.Label className="font-content">Phone</Form.Label>
                                <Field name="userPhone">
                                    {({ field }) => (
                                        <Form.Control type="text" placeholder="Phone" {...field}></Form.Control>
                                    )}
                                </Field>
                                <ErrorMessage name="userPhone">
                                    {error => (
                                        <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                    )}
                                </ErrorMessage>
                            </Form.Group>
                            <Form.Group as={Col} lg="6" className="my-2">
                                <Form.Label className="font-content">Address</Form.Label>
                                <Field type="text" name="userAddress" placeholder="Address">
                                    {({ field }) => <Form.Control {...field}></Form.Control>}
                                </Field>
                                <ErrorMessage name="userAddress">
                                    {error => (
                                        <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                    )}
                                </ErrorMessage>
                            </Form.Group>
                            <Form.Group>
                                <Form.Check
                                    type="checkbox"
                                    label="Use user profile"
                                    className="font-content my-2"
                                    onChange={event => handleShowUserInfo(event.target.checked, setFieldValue)}
                                ></Form.Check>
                            </Form.Group>
                        </Row>
                        <Row>
                            <Col lg="6">
                                <Form.Label as="h3" className="border-bottom font-title my-2 text-center">
                                    Delivery method
                                </Form.Label>
                                <Form.Group>
                                    <Field name="deliveryMethod">
                                        {({ field }) =>
                                            ['7-11 Store', 'Family store', 'Home delivery'].map((method, index) => (
                                                <Form.Check
                                                    key={index}
                                                    type="radio"
                                                    label={method}
                                                    {...field}
                                                    value={method}
                                                    className="font-content my-2"
                                                />
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="deliveryMethod">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                </Form.Group>
                            </Col>
                            <Col lg="6">
                                <Form.Label as="h3" className="border-bottom font-title my-2 text-center">
                                    Pay method
                                </Form.Label>
                                <Form.Group>
                                    <Field name="payMethod">
                                        {({ field }) =>
                                            ['Cash on delivery ', 'Credit card'].map((method, index) => (
                                                <Form.Check
                                                    key={index}
                                                    type="radio"
                                                    label={method}
                                                    {...field}
                                                    value={method}
                                                    className="font-content my-2"
                                                ></Form.Check>
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="payMethod">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row className="my-2">
                            <Col lg="12">
                                <Form.Group className="my-2">
                                    <Form.Label as="h3" className="border-bottom font-title my-2 text-center">
                                        Remark
                                    </Form.Label>
                                    <Field name="remark">
                                        {({ field }) => (
                                            <Form.Control type="text" as="textarea" rows={3} {...field}></Form.Control>
                                        )}
                                    </Field>
                                    <ErrorMessage name="remark">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                </Form.Group>
                            </Col>
                            <Col lg="12">
                                <Form.Label as="h3" className="border-bottom font-title my-2 text-center">
                                    Invoice
                                </Form.Label>
                                <InputGroup className="d-flex mb-3 my-2 ">
                                    <Field name="invoice.type" type="text">
                                        {({ field, form }) => (
                                            <>
                                                <DropdownButton
                                                    variant="outline-secondary"

                                                    title={field.value || 'Dropdown'}
                                                    onSelect={eventKey => {
                                                        form.setFieldValue(field.name, eventKey);
                                                        form.setFieldValue('invoice.number', "");
                                                        form.setFieldTouched('invoice.number', false);
                                                    }}

                                                    {...field}
                                                >
                                                    <Dropdown.Item eventKey="Donation">Donation</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Phone carrier">Phone carrier</Dropdown.Item>
                                                    <Dropdown.Item eventKey="Natural individual">
                                                        Natural individual
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="Paper invoice">Paper invoice</Dropdown.Item>
                                                </DropdownButton>
                                            </>
                                        )}
                                    </Field>
                                    <Field name="invoice.number">
                                        {({ field, form: { values } }) =>
                                            values.invoice.type === 'Paper invoice' || values.invoice.type === "" ? (
                                                <Form.Control disabled {...field} />
                                            ) : (
                                                <Form.Control type="text" {...field} />
                                            )
                                        }
                                    </Field>
                                </InputGroup>
                                <ErrorMessage className="ms-2" name="invoice.number">

                                    {error => (

                                        <Form.Label className="d-flex fw-bold me-1 text-red">{values["invoice"].type === "Paper invoice" ? null : error}</Form.Label>
                                    )}
                                </ErrorMessage>
                            </Col>
                        </Row>
                        <Button
                            type="submit"
                            className="align-self-end bg-beige font-btn fs-5 fw-bold text-black index-0"
                        >
                            Submit
                        </Button>
                    </Form>
                )
                }
            </Formik >
        </Col>
    );
};

export default CheckoutForm;
