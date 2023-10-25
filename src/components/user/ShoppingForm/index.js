import React, { useState } from 'react';
import { Formik, Field, ErrorMessage } from 'formik';
import {
    ToggleButton,
    ToggleButtonGroup,
    Form,
    Button,
    ButtonGroup,
} from 'react-bootstrap';
import { setTextColor } from '../../../utils/tools/setTextColor';
import * as Yup from 'yup';

const valuesSchema = Yup.object().shape({
    color: Yup.string().required('Please pick a color!'),
    size: Yup.string().required('Please pick a size!'),
});

const ShoppingForm = ({ onFormSubmit, initialValue }) => {

    const { product_colors, product_sizes } = initialValue

    return (
        <Formik
            initialValues={{ color: '', size: '', quantity: 1 }}
            validationSchema={valuesSchema}
            onSubmit={formValue => {
                onFormSubmit(formValue);
            }}
        >
            {({ handleSubmit, isSubmitting, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <Form.Label className="font-content fs-5 fw-bold me-1">Color :</Form.Label>
                    <Field name="color">
                        {({ field, form: { values } }) => (
                            <ToggleButtonGroup type="radio" name="color" className="d-block">
                                {product_colors?.map((color) => (
                                    <ToggleButton
                                        key={color}
                                        value={color}
                                        className={`mx-1 mt-2 font-content border-1 bg-${color} ${setTextColor(color) ? 'text-black' : 'text-white'
                                            }  ${values.color === color ? 'rounded-pill' : null}`}
                                        {...field}
                                        onClick={() => setFieldValue('color', color)}
                                    >
                                        {color}
                                    </ToggleButton>
                                ))}
                            </ToggleButtonGroup>
                        )}
                    </Field>
                    <ErrorMessage name="color">
                        {error => (
                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                        )}
                    </ErrorMessage>
                    <Form.Group className="mt-2" controlId="formGridState">
                        <Form.Label className="font-content fs-5 fw-bold me-1">Size:</Form.Label>
                        <Field name="size">
                            {({ field }) => (
                                <Form.Select className="h-50 w-50" {...field}>
                                    <option className="font-content" selected>
                                        select size
                                    </option>
                                    {product_sizes?.map(size => (
                                        <option className="font-content" key={size} value={size}>
                                            {size}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                        </Field>
                        <ErrorMessage name="size">
                            {error => (
                                <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                            )}
                        </ErrorMessage>
                        <Form.Label className="font-content fs-5 fw-bold me-1">Quantity:</Form.Label>
                        <Field name="quantity">
                            {({ field }) => (
                                <Form.Select className="h-50 w-50" {...field}>
                                    {[1, 2, 3, 4, 5].map((number, index) => (
                                        <option className="font-content" key={index} value={number}>
                                            {number}
                                        </option>
                                    ))}
                                </Form.Select>
                            )}
                        </Field>
                    </Form.Group>
                    <div className="d-flex justify-content-end">
                        <Button
                            type="submit"
                            size="sm"
                            variant="none"
                            className="bg-beige border border-black font-btn fs-5 fw-bold mt-2 text-black"
                        >
                            Add to cart
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

export default ShoppingForm;
