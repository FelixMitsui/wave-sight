/** @format */

import React from 'react';
import { Button, Image } from 'react-bootstrap';

const ProductTable = ({ item, onOpenInterface, number }) => {
 const {
  product_name,
  product_images,
  product_sale,
  product_new,
  product_popularity,
  product_discount,
 } = item || {};
 return (
  <>
   <tr className="font-content text-center">
    <th>{number + 1}</th>
    <th>{product_name}</th>
    <th>
     <Image
      fluid
      responsive="md"
      thumbnail
      width={100}
      height={100}
      className="d-block mx-auto"
      src={product_images[0]}
     />
    </th>
    <th>{product_sale.toString()}</th>
    <th>{product_new.toString()}</th>
    <th>{product_popularity.toString()}</th>
    <th>{product_discount}</th>
    <th>
     <Button
      type="button"
      className="btn-gray mt-2 text-white"
      onClick={() => onOpenInterface(item)}
     >
      Modify
     </Button>
    </th>
   </tr>
  </>
 );
};

export default ProductTable;
