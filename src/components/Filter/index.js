/** @format */

import React, { useRef } from 'react';
import { Form } from 'react-bootstrap';

const Filter = ({ onPriceSort }) => {
 const priceRef = useRef();

 return (
  <Form>
   <Form.Group>
    <Form.Label className="font-content fs-5 fw-bold text-center" column sm={12}>
     Price
    </Form.Label>
    <Form.Select ref={priceRef} onChange={() => onPriceSort(priceRef.current.value)}>
     <option className="font-content fs-6">Default</option>
     <option className="font-content fs-6" value="High">
      High
     </option>
     <option className="font-content fs-6" value="Low">
      Low
     </option>
    </Form.Select>
   </Form.Group>
  </Form>
 );
};
export default Filter;
