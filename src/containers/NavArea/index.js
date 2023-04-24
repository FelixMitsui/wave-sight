import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, Form, FormControl, Button, Container, Stack } from 'react-bootstrap';
import { NavLink, useMatch, useNavigate } from 'react-router-dom';
import { FRONTEND_URL } from '../../util/constants/url';
import { CartIcon, SearchIcon } from '../../../src/Icons';
import Person from '../../../src/components/Person';
import LoginModal from "../../components/LoginModal";
import RegisterModal from "../../components/RegisterModal";
import { userTypes } from '../../redux/userModule';

const NavArea = (props) => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const navigate = useNavigate()
  const [isLoginShow, setIsLoginShow] = useState(false)
  const [isRegisterShow, setIsRegisterShow] = useState(false)
  const [isLogin, setIsLogin] = useState(false)
  const [isToggle, setIsToggle] = useState(false);
  const matched = useMatch('manage/*');
  const { user: { user_name, user_role }, error } = useSelector((state) => state.user);

  useEffect(() => {
    if (user_name) {
      setIsLogin(true);
    } else {
      const loginToken = localStorage.getItem('loginToken')
      if (loginToken !== null)
        dispatch({ type: userTypes.CHECK_USER_AUTH_REQUEST });
    }
  }, [user_name]);

  useEffect(() => {
    if (error.status === 401) {
      navigate('/')
    }
  }, [error]);

  const handleToggle = () => {
    if (isToggle) {
      setIsToggle(toggle => !toggle);
    }
  };
  const handleLogin = (userInfo) => {
    dispatch({ type: userTypes.LOGIN_REQUEST, payload: userInfo })
    setIsLoginShow(false)
  }
  const handleLogout = () => {
    dispatch({ type: userTypes.LOGOUT_REQUEST });
    setIsLogin(false);
    navigate('/')
  };

  const handleNoLogin = (e) => {
    if (isLogin) {
      return;
    } else {
      alert("Please login your account!");
      e.preventDefault();
    }
  };

  const handleRegister = (userInfo) => {
    dispatch({ type: userTypes.REGISTER_REQUEST, payload: userInfo })
    setIsRegisterShow(false)
  }

  const handleKeyDown = (e) => {
    if (e.keyCode == 13) {
      location.href = `search?q=${e.target.value}`;
      e.preventDefault();
    }
  };

  return (
    <>
      <Navbar
        collapseOnSelect
        expanded={isToggle}
        className="index-2 bg-light-gray border d-flex justify-content-between position-fixed top-0 start-0 end-0"
        expand="lg"
      >
        <Container >
          <NavLink as={NavLink} to="/" className=" me-1 fs-1 text-light font-title nav-animation">
            WaveSight
          </NavLink>
          <Navbar.Collapse id="navbarScroll">
            <Nav className="me-3 my-1 ">
              {
                props.navLink?.map((link, index) =>
                  <Nav.Link
                    key={index}
                    className='fs-5 fw-bold text-decoration font-nav'
                    as={NavLink}
                    to={link.path}>
                    {link.linkName}
                  </Nav.Link>)
              }
            </Nav>
            {!matched &&
              <div className='d-flex  mb-2'>
                <FormControl
                  type="search"
                  placeholder="Search"
                  ref={searchRef}
                  className=""
                  aria-label="Search"
                  onKeyDown={(e) => handleKeyDown(e)}
                />
                <Button
                  variant="none"
                  className="ms-1 border border-white"
                  onClick={() => location.href = `search?q=${searchRef.current.value}`}
                >
                  <SearchIcon />
                </Button></div>
            }
          </Navbar.Collapse>
          <div className='d-flex'>
            <Stack
              direction="horizontal"
              gap={2}
              className='pt-btn align-self-center  '
            >
              {!matched ?
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
                </NavLink> : null
              }
              <Person
                userInfo={{ user_name, user_role }}
                setIsLoginShow={setIsLoginShow}
                handleLogout={handleLogout}
                isLogin={isLogin}
                setIsToggle={setIsToggle}
                setIsRegisterShow={setIsRegisterShow}
              />
            </Stack>
            <Navbar.Toggle
              onClick={() => setIsToggle(toggle => !toggle)}
              aria-controls="navbarScroll"
              className='ms-2 border border-white'
            />
          </div>
        </Container>

      </Navbar >
      <div
        className="index-1  position-fixed bottom-0 top-0 end-0 start-0"
        onClick={() => handleToggle()}
        style={{ display: `${isToggle ? "block" : "none"} ` }}
      />
      <LoginModal show={isLoginShow} handleClose={() => setIsLoginShow(false)} handleLogin={handleLogin} />
      <RegisterModal show={isRegisterShow} handleClose={() => setIsRegisterShow(false)} handleRegister={handleRegister} />
    </>
  )
}

export default NavArea
