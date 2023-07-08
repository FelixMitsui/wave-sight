/** @format */

import React, { useState, useEffect, useRef, memo } from 'react';
import { Button, Image } from 'react-bootstrap';

const CartItem = ({
 item,
 number,
 user_id = '',
 onTotalCalculate,
 handleItemQuantity = null,
 onDeleteItem = null,
 isEdit = true,
}) => {
 const {
  product_mark,
  product_image,
  product_name,
  product_color,
  product_size,
  product_quantity,
  product_discount,
  product_price,
 } = item;

 const quantityRef = useRef(product_quantity);
 const [disabled, setDisabled] = useState(false);

 useEffect(() => {
  onTotalCalculate(product_price * quantityRef.current * product_discount);
 }, []);

 const handleCalculate = event => {
  const target = event.target.value;

  if (target === '+') {
   if (quantityRef.current >= 1) {
    quantityRef.current++;
    onTotalCalculate(product_price * product_discount);
    setDisabled(false);
   }
   handleItemQuantity({
    user_id,
    product_mark,
    product_quantity: quantityRef.current,
   });
   return;
  }

  if (target === '-') {
   if (quantityRef.current <= 1) {
    setDisabled(true);
    return;
   }
   quantityRef.current--;
   onTotalCalculate(-product_price * product_discount);
   handleItemQuantity({
    user_id,
    product_mark,
    product_quantity: quantityRef.current,
   });
   return;
  }
 };

 return (
  <tr className="border-light-gray font-content text-center">
   <th>{number + 1}</th>
   <th>
    <Image
     fluid={true}
     responsive="md"
     thumbnail={true}
     width={100}
     height={100}
     className="d-block mx-auto"
     src={product_image}
    />
   </th>
   <th>{product_name}</th>
   <th>{product_color}</th>
   <th>{product_size}</th>
   <th>
    {isEdit ? (
     <div className="d-flex">
      <input
       className="btn-gray me-1"
       type="button"
       disabled={disabled}
       value="-"
       onClick={handleCalculate}
      />
      {quantityRef.current}
      <input
       className="btn-gray ms-1"
       type="button"
       value="+"
       onClick={handleCalculate}
      />
     </div>
    ) : (
     quantityRef.current
    )}
   </th>
   <th>NT{Math.floor(product_price * quantityRef.current * product_discount)}$</th>
   {isEdit ? (
    <th>
     <Button
      className="border border-1 border-black btn-beige font-content mt-2"
      onClick={() =>
       onDeleteItem(
        {
         user_id,
         product_mark,
        },
        product_price * quantityRef.current * product_discount
       )
      }
     >
      Delete
     </Button>
    </th>
   ) : null}
  </tr>
 );
};
function areEqual(prevProps, nextProps) {
 if (prevProps.item.product_quantity !== nextProps.item.product_quantity) {
  return false;
 }
 return true;
}
export default memo(CartItem, areEqual);
