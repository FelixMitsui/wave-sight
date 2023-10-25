import React from "react";
import { Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";

const NavButton = ({ name, path, children, onClick, btnStyle, textStyle }) => {

    const navigate = useNavigate();

    const handleClick = () => {

        if (onClick) {
            onClick();
        }

        navigate(path);
    }

    return (
        <Button
            className={`m-1 border border-2 border-white index-2 d-flex  ${textStyle} ${btnStyle}`}
            onClick={handleClick}
        >
            {children}
            <span className="font-btn fs-6 fw-bold">{name}</span>
        </Button>
    )
}

export default NavButton;