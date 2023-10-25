
import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Image } from 'react-bootstrap';

const ProductTableRow = ({ item, onOpenInterface, number }) => {

    const {
        _id: product_id,
        product_name,
        product_imgs,
        product_sale,
        product_popularity,
        product_discount,
    } = item || {};

    return (
        <>
            <tr className="font-content text-center">
                <td>{number + 1}</td>
                <td>{product_name}</td>
                <td>
                    <Image
                        fluid
                        responsive="md"
                        thumbnail
                        width={100}
                        height={100}
                        className="d-block mx-auto"
                        src={product_imgs[0]}
                    />
                </td>
                <td>{product_sale.toString()}</td>
                <td>{product_popularity.toString()}</td>
                <td>{product_discount}</td>
                <td>
                    <Button
                        type="button"
                        className="btn-gray mt-2"
                    >
                        <Link className="text-white text-decoration-none" to={`/manage/products/${product_id}`}>Modify</Link>
                    </Button>
                </td>
            </tr>
        </>
    );
};

export default ProductTableRow;
