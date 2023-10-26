import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BreadCrumb from '../../../components/common/BreadCrumb';
import UserForm from '../../../components/user/UserForm';
import { RootState } from 'redux/store';

const Profile = () => {

  const navigate = useNavigate();

  const { info: user, isLogin } = useSelector((state: RootState) => state.user);

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
      <UserForm user={user} />
    </section>
  );
};
export default Profile;
