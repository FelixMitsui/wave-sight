/** @format */

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { Table, Row, Col } from 'react-bootstrap';
import Create from '../Create';
import ProductTable from '../../../components/ProductTable';
import { manageTypes } from '../../../redux/manageModule';
import { useEditInterface } from '../../../hooks/useEditInterface';
import PageList from '../../../components/PageList';

const EditProduct = () => {
    const dispatch = useDispatch();
    const { items, totalPages } = useSelector(state => state.manage.products);
    const location = useLocation();
    const pageQuery = location.search;
    const currentIndex = pageQuery.split('?page=')[1] - 1 || 0;
    const limit = 5;
    const startIndex = currentIndex * limit;
    const endIndex = startIndex + limit || limit;
    const pageItems = items[startIndex] ? items.slice(startIndex, endIndex) : [];
    const {
        isDisplay,
        value: productValue,
        setValue: setProductValue,
        handleOpenInterface,
        handleCloseInterface,
    } = useEditInterface();

    useEffect(() => {
        if (items[endIndex - 1]) return;
        dispatch({
            type: manageTypes.GET_ALL_PRODUCTS_REQUEST,
            payload: { pageQuery, currentIndex, limit },
        });
    }, [pageQuery]);

    return (
        <>
            <div className="bg-gray">
                <h1 className="border font-title mt-2 text-center text-white">Product Manage</h1>
            </div>
            <Row className="border m-2 min-vh-100 p-2">
                {isDisplay ? (
                    <Create isDisplay item={productValue} onCloseInterface={handleCloseInterface} />
                ) : (
                    <Col>
                        <Table className="overflow-scroll" striped bordered responsive hover>
                            <thead>
                                <tr className="font-content text-center">
                                    <th>No.</th>
                                    <th>Product Name</th>
                                    <th>Image</th>
                                    <th>Sale Status</th>
                                    <th>New Sale</th>
                                    <th>Popular</th>
                                    <th>Discount</th>
                                </tr>
                            </thead>
                            <tbody>
                                {pageItems?.map((item, index) => (
                                    <ProductTable
                                        key={item._id}
                                        number={index + startIndex}
                                        {...{ item }}
                                        onOpenInterface={handleOpenInterface}
                                    />
                                ))}
                            </tbody>
                        </Table>
                        <PageList currentIndex={currentIndex} totalPages={totalPages} />
                    </Col>
                )}
            </Row>
        </>
    );
};
export default EditProduct;
