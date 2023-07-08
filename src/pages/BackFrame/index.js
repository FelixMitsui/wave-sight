/** @format */

import React, { useEffect } from 'react';
import { Container } from 'react-bootstrap';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
const BackFrame = () => {
 const navigate = useNavigate();
 const {
  info: { user_role },
 } = useSelector(state => state.user);
 useEffect(() => {
  if (user_role && user_role !== 'admin') {
   navigate('/');
  }
 }, [user_role]);

 return (
  <Container className="min-vh-100 pb-1 pt-6 px-0">
   <Outlet />
  </Container>
 );
};
export default BackFrame;
