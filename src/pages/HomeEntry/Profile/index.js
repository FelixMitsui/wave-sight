
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import BreadCrumb from '../../../components/common/BreadCrumb';
import { Button, Row, Col } from 'react-bootstrap';
import UserForm from '../../../components/user/UserForm';


const Profile = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { info, isLogin } = useSelector(state => state.user);


  const loginToken = localStorage.getItem('loginToken');

  useEffect(() => {
    if ((isLogin || !loginToken) && !isLogin) {
      navigate('/');
    }
  }, [isLogin]);


  return (
    <section className="pt-3">
      <BreadCrumb />
      <h1 className="border bg-gray d-flex font-title justify-content-center mt-2 text-white">
        Profile
      </h1>
      <UserForm infoItem={info} />

    </section>
  );
};
export default Profile;
