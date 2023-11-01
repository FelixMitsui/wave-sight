import React from 'react';
import { Formik } from 'formik';
import { ToggleButton, ToggleButtonGroup, Form, Button } from 'react-bootstrap';
import { setTextColor } from '../../../utils/tools/setTextColor';
import { valuesSchema } from './constants';
import FormikGroup from '../../common/FormikGroup';

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
            {({ handleSubmit, setFieldValue }) => (
                <Form onSubmit={handleSubmit}>
                    <FormikGroup label="Color:" fieldName="color">
                        {({ field, form: { values } }) => (
                            <ToggleButtonGroup type="radio" name="color" className="d-block">
                                {product_colors?.map((color) => {

                                    const textColor = setTextColor(color) ? "text-black" : "text-white";
                                    const isCurrentColor = values.color === color ? 'rounded-pill' : null;

                                    return (<ToggleButton
                                        key={color}
                                        value={color}
                                        className={`mx-1 mt-2 font-content border-1 bg-${color} ${textColor} ${isCurrentColor}`}
                                        {...field}
                                        onClick={() => setFieldValue('color', color)}
                                    >
                                        {color}
                                    </ToggleButton>)
                                })}
                            </ToggleButtonGroup>
                        )}
                    </FormikGroup>
                    <FormikGroup label="Size:" fieldName="size">
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
                    </FormikGroup>
                    <FormikGroup label="Quantity:" fieldName="quantity">
                        {({ field }) => (
                            <Form.Select className="h-50 w-50" {...field}>
                                {[1, 2, 3, 4, 5].map((number) => (
                                    <option className="font-content" key={number} value={number}>
                                        {number}
                                    </option>
                                ))}
                            </Form.Select>
                        )}
                    </FormikGroup>
                    <div className="d-flex justify-content-end">
                        <Button
                            type="submit"
                            variant="none"
                            className="bg-beige border border-black font-btn fw-bold mt-2 text-black"
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
