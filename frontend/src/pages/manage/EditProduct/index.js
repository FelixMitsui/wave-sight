import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { Table } from "react-bootstrap";
import Create from "../Create";
import ProductTable from "../../../components/manage/ProductTable";
import { productActions } from "../../../redux/productModule";

const EditProduct = () => {

    const dispatch = useDispatch()
    const products = useSelector((state) => state.product.products)

    const [showEdit, setShowEdit] = useState(false)
    const [editValue, setEditValue] = useState(null)

    useEffect(() => {
        if (products.length != 0) {
            return
        } else {
            dispatch(productActions.getAllProducts())
        }
    }, [])

    const handleShowEdit = (bool, value) => {
        setShowEdit(bool)
        setEditValue(value)

    }


    const tableItems = products?.map((item, index) =>
        <ProductTable
            key={item._id}
            num={index}
            item={item}
            handleShowEdit={() => handleShowEdit(true, item)}
        />
    )

    return (
        <div className=" h-100">
            <h1
                style={{ fontFamily: "fantasy" }}
                className="mt-2 border bg-gray text-white d-flex justify-content-center">
                Product Manage
            </h1>
            {showEdit ? (
                <Create
                    productValue={editValue}
                    handleClose={setShowEdit}
                />
            ) : (
                <Table striped bordered hover>
                    <thead>
                        <tr className="text-center">
                            <th>No.</th>
                            <th>Product Name</th>
                            <th>Image</th>
                            <th>Sale Status</th>
                            <th>New Sale</th>
                            <th>Popular</th>
                            <th>Discount</th>
                        </tr>
                    </thead>
                    <tbody >{tableItems}</tbody>
                </Table>
            )
            }
        </div >
    )
}
export default EditProduct