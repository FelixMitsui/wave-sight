/** @format */
import React from 'react'
import { Dropdown, Badge, Button } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import { LoginIcon, LogoutIcon, PersonIcon, RegisterIcon, ProfileIcon, ManageIcon } from '../../../src/Icons'

const Person = ({ userInfo: { user_name, user_role }, isLogin, handleLogout, setIsLoginShow, setIsRegisterShow }) => {
  return (
    <Dropdown align="end" className='index-3' >
      <Dropdown.Toggle variant="border-white border border-2" >
        <PersonIcon
          viewBox="0 0 18 18"
          width="30"
          height="30" />
      </Dropdown.Toggle>
      <Dropdown.Menu className="bg-light-gray mt-3 px-3">
        <Badge bg="deep-gray" className="fs-5 ms-4 font-content">
          {user_name || 'Guest'}
        </Badge>
        <hr />
        {isLogin ?
          <>
            {user_role === "admin" &&
              <div className='mt-2'>
                <ManageIcon
                  viewBox="0 0 18 18"
                  width="30"
                  height="30" />
                <NavLink to="/manage" >
                  <Button className='index-2 fs-6 text-white outline-light btn-deep-gray border ms-2 font-btn'>
                    Manage
                  </Button>
                </NavLink>
              </div>
            }
            <div className='mt-2'>
              <ProfileIcon
                viewBox="0 0 18 18"
                width="30"
                height="30" />
              <NavLink to="/user/profile" >
                <Button className='index-2 fs-6 text-white  outline-light btn-deep-gray border ms-2 font-btn'>
                  Profile
                </Button>
              </NavLink>
            </div>
            <div className='mt-2'>
              <LogoutIcon
                viewBox="0 0 18 18"
                width="30"
                height="30" />
              <Button className='index-2 fs-6 text-white outline-light btn-deep-gray border ms-2 font-btn' onClick={handleLogout}>
                Logout
              </Button>
            </div>
          </>
          : <>
            <div className='mt-2'>
              <LoginIcon
                viewBox="0 0 18 18"
                width="30"
                height="30" />
              <Button className='index-2 fs-6 text-white outline-light btn-deep-gray border ms-2 font-btn' onClick={setIsLoginShow}>
                Login
              </Button>
            </div>
            <div className='mt-2'>
              <RegisterIcon
                viewBox="0 0 18 18"
                width="30"
                height="30" />
              <Button className='index-2 fs-6 text-white outline-light btn-deep-gray border ms-2 font-btn' onClick={setIsRegisterShow} >
                Register
              </Button>
            </div>
          </>}
      </Dropdown.Menu>
    </Dropdown >

  )
}
export default Person