import React from "react";
import Form from 'react-bootstrap/Form';
import { PRODUCT_CATEGORIES } from "../../../utils/constants/productForm";

const ProductSelectList = (props) => {

    return (

        <Form.Select aria-label="Default select" {...props}>
            <option>Open this select menu</option>
            {
                PRODUCT_CATEGORIES.map(category =>
                    <option key={category.cid} value={category.cid}>{category.name}</option>
                )
            }
        </Form.Select>
    )
}

export default ProductSelectList;