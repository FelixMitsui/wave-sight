import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import {
    ToggleButton, ToggleButtonGroup, Form, Button, ButtonGroup,
} from 'react-bootstrap';
import { setTextColor } from '../../util/setTextColor';
import uuid from 'react-uuid';
import * as Yup from 'yup'
import '../../../src/index'


const valuesSchema = Yup.object().shape({
    colorRadio: Yup.string().required('please pick a color!'),
    sizeSelect: Yup.string().required('please pick a size!')
})

const ShoppingForm = ({ onFormSubmit, defaultValue }) => {

    return (
        < Formik
            initialValues={{ colorRadio: '', sizeSelect: '', quantitySelect: 1 }}
            validationSchema={valuesSchema}
            onSubmit={(formValue) => {
                console.log(formValue)
                onFormSubmit(formValue)
            }}
        >
            {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <span className="fw-bold me-1">Color:</span>
                    <Field name="colorRadio"
                    >{({ field, form: { values } }) =>
                        <ToggleButtonGroup
                            type="radio"
                            name="colorRadio"
                            className='d-block'
                        >
                            {defaultValue.colors?.map((color) =>
                                <ToggleButton
                                    key={uuid()}
                                    value={color}
                                    className={`mx-1 mt-2 border-1 bg-${color} 
                                    ${setTextColor(color) ? "text-black" : "text-white"}  
                                     ${values.colorRadio === color ? "rounded-pill" : null}`}
                                    {...field}
                                    onClick={() => setFieldValue("colorRadio", color)}
                                >
                                    {color}
                                </ToggleButton>)}
                        </ToggleButtonGroup>}
                    </Field>
                    <ErrorMessage name="colorRadio">{(error) =>
                        <Form.Label className="fw-bold me-1 text-Red  d-flex">
                            {error}
                        </Form.Label>}
                    </ErrorMessage>
                    <Form.Group className="mt-2" controlId="formGridState">
                        <Form.Label className="fw-bold me-1  d-flex">Size:</Form.Label>
                        <Field name="sizeSelect">{({ field }) =>
                            <Form.Select
                                className="w-50 h-50"
                                {...field}
                            >
                                <option selected >select size </option>
                                {defaultValue.sizes?.map((size) => <option key={size} value={size} >{size}</option>)}
                            </Form.Select>}
                        </Field>
                        <ErrorMessage name="sizeSelect">{(error) =>
                            <Form.Label className="fw-bold me-1 text-Red  d-flex">
                                {error}
                            </Form.Label>}
                        </ErrorMessage>

                        <Form.Label className="fw-bold me-1">Quantity:</Form.Label>
                        <Field name="quantitySelect">{(field) =>
                            <Form.Select
                                className="w-50 h-50"
                                {...field}
                            >
                                {[1, 2, 3, 4, 5].map((number, index) =>
                                    <option key={index} value={number}>{number}</option>
                                )}
                            </Form.Select>}
                        </Field>
                    </Form.Group>
                    <ButtonGroup className="mt-4">
                        <Button variant="danger" className=" me-2">
                            Buy now
                        </Button>
                        <Button
                            type="submit"
                            variant="warning"
                            disabled={isSubmitting} >
                            Add to cart
                        </Button>
                    </ButtonGroup>
                </Form>
            )}</Formik >)
}

export default ShoppingForm