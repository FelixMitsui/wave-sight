import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import { ToggleButton, ToggleButtonGroup, Form, Button, ButtonGroup } from 'react-bootstrap';
import { setTextColor } from '../../util/setTextColor';
import uuid from 'react-uuid';
import * as Yup from 'yup';
import '../..';

const valuesSchema = Yup.object().shape({
    colorRadio: Yup.string().required('Please pick a color!'),
    sizeSelect: Yup.string().required('Please pick a size!')
});

const ShoppingForm = ({ onFormSubmit, defaultValue }) => {
    return (
        <Formik
            initialValues={{ colorRadio: '', sizeSelect: '', quantitySelect: 1 }}
            validationSchema={valuesSchema}
            onSubmit={(formValue) => {
                onFormSubmit(formValue);
            }}
        >
            {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Label className="fw-bold fs-5 me-1 font-content">Color :</Form.Label>
                    <Field name="colorRadio">
                        {({ field, form: { values } }) => (
                            <ToggleButtonGroup type="radio" name="colorRadio" className="d-block">
                                {defaultValue.colors?.map((color) => (
                                    <ToggleButton
                                        key={uuid()}
                                        value={color}
                                        className={`mx-1 mt-2 font-content border-1 bg-${color} ${setTextColor(color) ? 'text-black' : 'text-white'
                                            }  ${values.colorRadio === color ? 'rounded-pill' : null}`}
                                        {...field}
                                        onClick={() => setFieldValue('colorRadio', color)}
                                    >
                                        {color}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        )}
                    </Field>
                    <ErrorMessage name="colorRadio">
                        {(error) => (
                            <Form.Label className="fw-bold me-1 text-red  d-flex">{error}</Form.Label>
                        )}
                    </ErrorMessage>
                    <Form.Group className="mt-2" controlId="formGridState">
                        <Form.Label className="fw-bold fs-5 me-1 font-content">Size:</Form.Label>
                        <Field name="sizeSelect">
                            {({ field }) => (
                                <Form.Select className="w-50 h-50" {...field}>
                                    <option className='font-content' selected>select size</option>
                                    {defaultValue.sizes?.map((size) => (
                                        <option className='font-content' key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                        </Field>
                        <ErrorMessage name="sizeSelect">
                            {(error) => (
                                <Form.Label className="fw-bold me-1 text-red  d-flex">{error}</Form.Label>
                            )}
                        </ErrorMessage>

                        <Form.Label className="fw-bold fs-5 me-1 font-content">Quantity:</Form.Label>
                        <Field name="quantitySelect">
                            {({ field }) => (
                                <Form.Select className="w-50 h-50" {...field}>
                                    {[1, 2, 3, 4, 5].map((number, index) => (
                                        <option className='font-content' key={index} value={number}>
                                            {number}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                        </Field>
                    </Form.Group>
                    <ButtonGroup className="mt-4">
                        <Button disabled={false} size='sm' variant="danger" className=" me-2 font-btn fs-5">
                            Buy now
                        </Button>
                        <Button type="submit" size='sm' variant="warning" className='font-btn fs-5'>
                            Add to cart
                        </Button>
                    </ButtonGroup>
                </Form>
            )}
        </Formik>
    );
};

export default ShoppingForm