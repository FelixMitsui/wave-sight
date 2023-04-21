import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Nav, Navbar, Form, FormControl, Button, Container, Stack } from 'react-bootstrap';
import { NavLink, useMatch, useNavigate } from 'react-router-dom';
import { FRONTEND_URL } from '../../util/constants/url';
import { CartIcon, SearchIcon } from '../../../src/Icons';
import Person from '../../../src/components/Person';
import { userTypes } from '../../redux/userModule';

const NavArea = (props) => {
  const dispatch = useDispatch();
  const searchRef = useRef();
  const navigate = useNavigate()
  const [isToggle, setIsToggle] = useState(false);
  const matched = useMatch('manage/*');
  const { user: { user_name, user_role } } = useSelector((state) => state.user);

  useEffect(() => {
    if (user_name) {
      props.setIsLogin(true);
    } else {
      dispatch({ type: userTypes.CHECK_USER_AUTH_REQUEST });
    }
  }, [user_name]);

  const handleToggle = () => {
    if (isToggle) {
      setIsToggle(toggle => !toggle);
    }
  };

  const handleLogout = () => {
    dispatch({ type: userTypes.LOGOUT_REQUEST });
    props.setIsLogin(false);
    navigate('/')
  };

  const handleNoLogin = (e) => {
    if (props.isLogin) {
      return;
    } else {
      alert("Please login your account!");
      e.preventDefault();
    }
  };

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
        className="gray-lv3  border index-1  position-fixed top-0 start-0 end-0"
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
              <>
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
                  <SearchIcon />
                </Button></>
            }
          </Navbar.Collapse>
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
      </Navbar >
      <div
        className='h-100 bg-gray border  position-fixed top-0 start-0 end-0'
        onClick={() => handleToggle()}
        style={{ display: `${isToggle ? "block" : "none"} ` }}
      />
    </>
  )
}

export default NavArea
