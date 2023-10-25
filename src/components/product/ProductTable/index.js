import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Container, Table, Stack, Badge, Button } from "react-bootstrap";
import ProductTableRow from "../ProductTableRow";

const ProductTable = ({ items, page, onOpenInterface }) => {

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
                {items?.map((item, index) => (
                    <ProductTableRow
                        key={item._id}
                        number={index * page}
                        item={item}
                        onOpenInterface={onOpenInterface}
                    />
                ))}
            </tbody>
        </Table>
    )
}

export default ProductTable;