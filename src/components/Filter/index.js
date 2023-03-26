import React, { useRef } from 'react'

import { Form } from 'react-bootstrap'

const Filter = ({ handlePriceSort }) => {

  const priceRef = useRef()

  return (
    < Form >
      <Form.Group>
        <Form.Label className="fw-bold d-flex justify-content-center"
          column sm={12}>Price</Form.Label>
        <Form.Label />
        <Form.Select ref={priceRef} onChange={() => handlePriceSort(priceRef.current.value)}>
          <option>Default</option>
          <option value="High">High</option>
          <option value="Low">Low</option>
        </Form.Select>
      </Form.Group>
    </Form >


  )
}


export default Filter
