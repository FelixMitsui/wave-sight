import React, { useRef } from "react"
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { userTypes } from "../../../redux/userModule";
import { FormControl, Button } from "react-bootstrap";

export default function SearchBar() {

    const searchRef = useRef(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSearchKeyDown = event => {

        if (event.keyCode == 13) {
            if (event.target.value === '') {
                dispatch({ type: userTypes.SET_MESSAGE_SEND, payload: 'Input cannot be empty.' });
            } else {
                navigate(`search?q=${event.target.value}`);
            }
        }
    };

    function handleSearch() {

        if (searchRef.current.value === '') {
            dispatch({ type: userTypes.SET_MESSAGE_SEND, payload: 'Input cannot be empty.' });
        } else {
            navigate(`search?q=${searchRef.current.value}`);
        }
    };

    return (
        <div className="ms-2 mb-2 d-flex justify-content-end position-relative">
            <FormControl
                type="search"
                placeholder="Search"
                ref={searchRef}
                aria-label="Search"
                className="w-auto"
            />
            <Button
                variant="none"
                size="sm"
                className="me-1 bg-deep-gray end-0 position-absolute text-white top-10"
                onClick={handleSearch}
                onKeyDown={handleSearchKeyDown}
            >
                <i className="bx bx-search-alt-2" />
            </Button>
        </div>
    )
}
