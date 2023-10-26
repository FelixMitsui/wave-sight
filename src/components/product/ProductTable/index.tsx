import React from "react";
import { Table } from "react-bootstrap";
import ProductTableRow from "../ProductTableRow";

const ProductTable = ({ products, page }) => {

    return (

        <Table className="p-2 overflow-scroll" striped bordered responsive hover>
            <thead>
                <tr className="font-content text-center">
                    <th>No.</th>
                    <th>Image</th>
                    <th>Product Name</th>
                    <th>Sale Status</th>
                    <th>Popular</th>
                    <th>Discount</th>
                </tr>
            </thead>
            <tbody>
                {products?.map((product, index) => (
                    <ProductTableRow
                        key={product._id}
                        number={index * page}
                        product={product}
                    />
                ))}
            </tbody>
        </Table>
    )
}

export default ProductTable;