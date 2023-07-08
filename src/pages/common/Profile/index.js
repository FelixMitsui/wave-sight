/** @format */

import React, { useEffect, useState } from 'react';
import { matchRoutes, useNavigate } from 'react-router-dom';
import { routes } from '../../../router/routesList';
import { Formik, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import Form from 'react-bootstrap/Form';
import { useSelector, useDispatch } from 'react-redux';
import { userTypes } from '../../../redux/userModule';
import BreadCrumb from '../../../components/BreadCrumb';
import { Button, Row, Col } from 'react-bootstrap';
import withModal from '../../../HOC/withModal';
import PasswordModal from '../../../components/PasswordModal';

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
const Profile = () => {
  const PasswordWithModal = withModal(PasswordModal);
  const [isEdit, setIsEdit] = useState(true);
  const [isPasswordShow, setIsPasswordShow] = useState(false);
  const matchName = location.pathname.startsWith('/wave-sight')
    ? location.pathname.substring('/wave-sight'.length)
    : location.pathname;
  const matches = matchRoutes(routes, matchName);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { info, isLogin } = useSelector(state => state.user);
  const { _id: user_id, user_name, user_role, user_email, user_address, user_phone } =
    info || {};
  const loginToken = localStorage.getItem('loginToken');

  useEffect(() => {
    if ((isLogin || !loginToken) && !isLogin) {
      navigate('/');
    }
  }, [isLogin]);

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
    <>
      <BreadCrumb matches={matches} />
      <div className="bg-gray">
        <h1 className="border d-flex font-title justify-content-center mt-2 text-white">
          Profile
        </h1>
      </div>
      <Row className="border m-2 min-vh-100 p-2">
        <Col>
          <Formik
            initialValues={initialValues}
            validationSchema={valuesSchema}
            onSubmit={handleFormSubmit}
          >
            {({ handleSubmit }) => (
              <Form onSubmit={handleSubmit} className="d-flex flex-column my-2">
                <fieldset disabled>
                  <Form.Group className="mb-3">
                    <Form.Label className="font-content fs-5 fw-bold me-1 mt-1">
                      Name :
                    </Form.Label>
                    <Form.Control id="disabledTextInput" placeholder={user_name} />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="font-content fs-5 fw-bold me-1 mt-1">
                      Email :
                    </Form.Label>
                    <Form.Control id="disabledTextInput" placeholder={user_email} />
                  </Form.Group>
                </fieldset>
                <fieldset disabled={isEdit}>
                  <Form.Group className="mb-3">
                    <Form.Label className="font-content fs-5 fw-bold me-1 mt-1">
                      Phone :
                    </Form.Label>
                    <Field name="userPhone">
                      {({ field }) => <Form.Control type="text" {...field} />}
                    </Field>
                    <ErrorMessage name="userPhone">
                      {error => (
                        <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                      )}
                    </ErrorMessage>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label className="font-content fs-5 fw-bold me-1 mt-1">
                      Address :
                    </Form.Label>
                    <Field name="userAddress">
                      {({ field }) => <Form.Control type="text" {...field} />}
                    </Field>
                    <ErrorMessage name="userAddress">
                      {error => (
                        <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                      )}
                    </ErrorMessage>
                  </Form.Group>
                </fieldset>
                {isEdit ? null : (
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
          <div className="d-flex justify-content-end">
            <Button
              type="submit"
              size="sm"
              className="btn-deep-gray font-btn fs-5 fw-bold me-2 text-white"
              onClick={handleEditUser}
            >
              {isEdit ? 'Edit' : 'Cancel'}
            </Button>
            <PasswordWithModal
              name="Change Password"
              info={{ user_id, user_role }}
              actionType={userTypes.UPDATE_PASSWORD_REQUEST}
              btnSize={5}
            />
          </div>
        </Col>
      </Row>
    </>
  );
};
export default Profile;
