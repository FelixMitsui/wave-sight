import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Form from 'react-bootstrap/Form';
import { productTypes } from "../../../redux/productModule";


const FilterSelectList = ({ cid }) => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const filterList = [
        { name: "High --> Low", value: "&product_price=-1" },
        { name: "Low --> High", value: "&product_price=1" },
        { name: "New --> Old", value: "&create_at=-1" },
        { name: "Old --> New", value: "&create_at=1" }];

    const handleSelectChange = (event) => {

        dispatch({ type: productTypes.CLEAN_PRODUCT_ITEMS_SEND, payload: cid });

        navigate(`/products?cid=${cid}${event.target.value}`);
    };

    return (
        <div className="px-3 mb-2 d-flex justify-content-end align-items-center">
            <div className="me-2 fw-bold">Sort by : </div>
            <Form.Select aria-label="Default select" className="w-auto" onChange={handleSelectChange}>
                <option value="" className="my-2 font-content" >Default</option>
                {
                    filterList.map((item, index) =>
                        <option key={index} className="my-2 font-content" value={`${item.value}`}>{item.name}</option>
                    )
                }
            </Form.Select>
        </div>
    )
}

export default FilterSelectList;