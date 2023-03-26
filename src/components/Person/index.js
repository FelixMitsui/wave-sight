/** @format */

import React from 'react'
import { Dropdown, Badge, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LoginIcon, LogoutIcon, PersonIcon, RegisterIcon, ProfileIcon, ManageIcon } from '../../../src/Icons'


const Person = ({ userInfo: { user_name, user_role }, isLogin, handleLogout, setIsLoginShow, setIsRegisterShow }) => {
  return (
    <Dropdown align="end" >
      <Dropdown.Toggle variant="bg-gray border border-2" >
        <PersonIcon
          viewBox="0 0 18 18"
          width="30"
          height="30" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="gray-lv3 mt-3  px-3 ">

        <Badge bg="secondary" className="fs-6 ms-4">
          {user_name ? user_name : 'Guest'}
        </Badge>
        <hr />

        {isLogin ? (
          <>
            {user_role === "admin" ?
              (<div className='mt-2'>
                <ManageIcon
                  viewBox="0 0 18 18"
                  width="30"
                  height="30" />
                <NavLink to="/manage" >
                  <Button variant="outline-light light btn-secondary ms-2 ">
                    Manage
                  </Button>
                </NavLink>
              </div>) : null
            }
            <div className='mt-2'>
              <ProfileIcon
                viewBox="0 0 18 18"
                width="30"
                height="30" />
              <NavLink to="user/profile" >
                <Button variant="outline-light light btn-secondary ms-2 ">
                  Profile
                </Button>
              </NavLink>
            </div>
            <div className='mt-2'>
              <LogoutIcon
                viewBox="0 0 18 18"
                width="30"
                height="30" />
              <Button variant="outline-light light btn-secondary ms-2 " onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
        ) :
          <>
            <div className='mt-2'>
              <LoginIcon
                viewBox="0 0 18 18"
                width="30"
                height="30" />
              <Button variant="outline-light light btn-secondary ms-2 " onClick={setIsLoginShow}>
                Login
              </Button>
            </div>
            <div className='mt-2'>
              <RegisterIcon
                viewBox="0 0 18 18"
                width="30"
                height="30" />
              <Button variant="outline-light light btn-secondary border ms-2" onClick={setIsRegisterShow} >
                Register
              </Button>
            </div>
          </>}
      </Dropdown.Menu>
    </Dropdown >

  )
}
export default Person