import React, { FC } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

type ButtonProps = {
    name?: string;
    path?: string;
    children: JSX.Element;
    onClick?: () => void;
    btnStyle: string;
    textStyle: string;
}

const NavButton: FC<ButtonProps> = ({ name, path, children, onClick, btnStyle, textStyle }) => {

    const navigate = useNavigate();

    const handleClick = () => {

        if (onClick) {
            onClick();
        }

        if (path !== "") {
            navigate(path);
        }

    }

    return (
        <Button
            className={`m-1  border border-2 border-white index-2 d-flex align-items-center ${textStyle} ${btnStyle}`}
            onClick={handleClick}
        >
            {children}
            <span className="font-btn fw-bold">{name}</span>
        </Button>
    )
}

export default NavButton;