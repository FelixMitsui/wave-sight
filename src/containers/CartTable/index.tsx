/** @format */

import React, { useState, useCallback, FC } from 'react';
import { Table } from 'react-bootstrap';
import CartItem from '../../containers/CartItem';

type TableProps = {
 shopping_cart: Item[];
};
type Item = {
 product_mark: string;
};
const CartTable: FC<TableProps> = ({ shopping_cart }: TableProps) => {
 const [totalCash, setTotalCash] = useState<number>(0);

 const handleTotalCalculate = useCallback((price: number): void => {
  setTotalCash(prev => prev + price);
 }, []);

 return (
  <>
   <Table striped bordered hover responsive className="border-light-gray">
    <thead>
     <tr className="font-content fs-6">
      <th>No.</th>
      <th>Image</th>
      <th>Name</th>
      <th>Color</th>
      <th>Size</th>
      <th>Quantity</th>
      <th>Price</th>
     </tr>
    </thead>
    <tbody>
     {shopping_cart?.map((item, index) => (
      <CartItem
       key={item.product_mark}
       number={index}
       item={item}
       onTotalCalculate={handleTotalCalculate}
       isEdit={false}
      />
     ))}
    </tbody>
   </Table>
   <div className="font-content mt-2 text-end">
    <h4 className="fw-bold">
     Totall:<span className="bg-light-blue">{Math.floor(totalCash)}</span>$
    </h4>
   </div>
  </>
 );
};
export default CartTable;
