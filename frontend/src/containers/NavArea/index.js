/** @format */

import React, { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Nav, Navbar, Form, FormControl, Button, Container, Stack } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import '../../../src/index'

import { userActions } from '../../../src/redux/userModule'
import { CartIcon } from '../../../src/Icons'
import Person from '../../../src/components/Person'

const NavArea = (props) => {

  const dispatch = useDispatch()
  const searchRef = useRef()
  const [isToggle, setIsToggle] = useState(false)

  const { user: { user_name, user_role } } = useSelector((state) => state.user)

  useEffect(() => {
    if (user_name) {
      props.setIsLogin(true)
    }
    if (localStorage.getItem('token')) {
      dispatch(userActions.checkUserAuth())
    }
  }, [user_name])

  const handleToggle = () => {
    if (isToggle) {
      setIsToggle(toggle => !toggle)
    }
  }

  const handleLogout = () => {
    dispatch(userActions.logout())
    props.setIsLogin(false)
    location.href = FRONTEND_URL
  }

  const handleNoLogin = (e) => {
    if (props.isLogin) {
      return
    } else {
      alert("Please login your account!");
      e.preventDefault()
    }
  }

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      location.href = `search?q=${e.target.value}`
      e.preventDefault()
    }
  }

  return (
    <>
      <div >
        <Navbar
          collapseOnSelect
          expanded={isToggle}
          className="gray-lv3 border index-3  position-fixed top-0 start-0 end-0"
          expand="lg"
        >
          <Container >
            <div
              className="nav-default"
              style={{ transform: 'translateX(-150%)' }}
            >
              <Nav.Link as={NavLink} to="/" >
                <Navbar.Brand
                  style={{ fontFamily: "fantasy", transform: 'translateX(-150%)' }}
                  className=" fs-1 text-light "
                >
                  WaveSight
                </Navbar.Brand>
              </Nav.Link>
            </div>
            <Navbar.Collapse id="navbarScroll">
              <Nav className="me-3 my-1 ">
                {
                  props.navLink?.map((val, index) =>
                    <Nav.Link
                      key={index}
                      className='fs-5 fw-bold'
                      as={NavLink}
                      to={val.path}>
                      {val.linkName}
                    </Nav.Link>)
                }
              </Nav>
              <Form className="d-flex">
                <FormControl
                  type="search"
                  placeholder="Search"
                  ref={searchRef}
                  className="me-2"
                  aria-label="Search"
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <Button
                  variant="none"
                  onClick={() => location.href = `search?q=${searchRef.current.value}`}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"

                  >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                  </svg>
                </Button>
              </Form>
            </Navbar.Collapse>
            <Stack
              direction="horizontal"
              gap={2}
              className='pt-btn align-self-center  '
            >
              <NavLink
                to="user/cart"
                className='text-black border border-2 p-1'
                onClick={e => handleNoLogin(e)}
              >
                <CartIcon
                  viewBox="0 0 18 18"
                  width="33"
                  height="33"
                />
              </NavLink>
              <Person
                userInfo={{ user_name, user_role }}
                setIsLoginShow={props.setIsLoginShow}
                handleLogout={handleLogout}
                isLogin={props.isLogin}
                setIsToggle={setIsToggle}
                setIsRegisterShow={props.setIsRegisterShow}
              />
            </Stack>
            <Navbar.Toggle
              onClick={() => setIsToggle(toggle => !toggle)}
              aria-controls="navbarScroll"
              className='pt-fold'
            />
          </Container>
        </Navbar>
      </div>
      <div
        className='h-100  border  position-fixed top-0 start-0 end-0'
        onClick={() => handleToggle()}
        style={{ display: `${isToggle ? "block" : "none"}` }}
      />
    </>
  )
}

export default NavArea
