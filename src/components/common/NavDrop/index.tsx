import React from "react";
import { NavLink } from "react-router-dom";
import { Dropdown, Nav } from "react-bootstrap";


const NavDrop = ({ linkGroup }) => {

    return (
        linkGroup.map((link, index) => {
            const { category, path, subcategories } = link;

            return (
                <Dropdown key={index} className="m-1 px-1 d-flex flex-column align-items-end border-start  border-3">
                    <Nav.Item className="d-flex align-items-center">
                        <Nav.Link className="py-0 px-0 font-nav fw-bold" as={NavLink} to={path}>
                            {category}
                        </Nav.Link>
                        {subcategories && <Dropdown.Toggle size="sm" className="ms-2 btn-deep-gray" id="dropdown-split-basic" />}
                    </Nav.Item>
                    {subcategories ? (
                        <Dropdown.Menu>
                            {subcategories.map((subCategory, subIndex) => {
                                const { category, path, subcategories } = subCategory;

                                return subcategories ? (
                                    <Dropdown key={subIndex} className="m-3 d-flex flex-column align-items-end ">
                                        <Nav.Item className="d-flex ">
                                            <Nav.Link className="py-0 px-0 font-nav fw-bold" as={NavLink} to={path}>
                                                {category}
                                            </Nav.Link>
                                            <Dropdown.Toggle size="sm" className="ms-2 btn-deep-gray" id="dropdown-split-basic" />
                                        </Nav.Item>
                                        <Dropdown.Menu className="mt-2 position-relative">
                                            {subcategories.map((subCategory, subSubIndex) => {
                                                const { category, path } = subCategory;

                                                return (
                                                    <Dropdown.Item key={subSubIndex} >
                                                        <Nav.Link className="border border-0 border-black border-bottom  font-nav fw-bold text-center" as={NavLink} to={path}>
                                                            {category}
                                                        </Nav.Link>
                                                    </Dropdown.Item>
                                                );
                                            })}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                ) : (
                                    <Dropdown.Item key={subIndex}>
                                        <Nav.Link className="border border-0 border-black border-bottom  font-nav fw-bold text-center" as={NavLink} to={path}>
                                            {category}
                                        </Nav.Link>
                                    </Dropdown.Item>
                                );
                            })}
                        </Dropdown.Menu>
                    ) : null}
                </Dropdown>
            );
        })
    );
}

export default NavDrop;