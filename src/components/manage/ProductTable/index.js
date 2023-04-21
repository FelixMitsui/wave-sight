import React from "react";
import { Button, Image } from "react-bootstrap";

const ProductTable = (props) => {
    const { product_name, product_images, product_sale, product_new, product_popularity, product_discount } = props?.item
    const handleToggle = () => {
        props.handleShowEdit()
    }
    return (
        <>
            <tr className="text-center font-content">
                <th>{props.num + 1}</th>
                <th>{product_name}</th>
                <th><Image
                    fluid={true}
                    responsive="md"
                    thumbnail={true}
                    width={100}
                    height={100}
                    className="mx-auto d-block "
                    src={product_images[0]}
                /></th>
                <th>{`${product_sale}`}</th>
                <th>{`${product_new}`}</th>
                <th>{`${product_popularity}`}</th>
                <th>{product_discount}</th>
                <th>
                    <Button
                        type="button"
                        className='mt-2 btn-gray '
                        onClick={() => handleToggle()}
                    >
                        Modify
                    </Button>
                </th>
            </tr >
        </>
    )
}

export default ProductTable