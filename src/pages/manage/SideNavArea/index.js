import React from 'react';
import { Nav, Button } from 'react-bootstrap';
import { NavLink } from 'react-router-dom'
function SideNavArea() {
    return (
        <Nav className="gray-lv3 flex-column mt-2 h-100 border">
            <Nav.Link className='text-nowrap'
                as={NavLink} to="/manage/create">
                <Button variant="outline-light light fs-5 font-btn btn-secondary">
                    Create Product
                </Button>
            </Nav.Link>
            <Nav.Link className='text-nowrap'
                as={NavLink} to="/manage/users">
                <Button variant="outline-light light fs-5 font-btn btn-secondary">
                    User Manage
                </Button></Nav.Link>
            <Nav.Link className='text-nowrap'
                as={NavLink} to="/manage/products">
                <Button variant="outline-light light fs-5 font-btn btn-secondary  ">
                    Product Manage
                </Button></Nav.Link>
        </Nav>

    );
}

export default SideNavArea