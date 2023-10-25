import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import ImgList from '../../../components/common/ImgList';
import Loading from '../../../components/common/Loading';
import {
    PRODUCT_CATEGORIES,
    PRODUCT_COLORS,
    PRODUCT_PARTS,
    PRODUCT_SIZES,
} from '../../../utils/constants/productForm';
import UploadButton from '../../../components/common/UploadButton';
import { getImageSrc } from '../../../utils/tools/getImageSrc';
import { setTextColor } from '../../../utils/tools/setTextColor';
import { manageTypes } from '../../../redux/manageModule';
import FormikGroup from '../../../components/common/FormikGroup';
import ProductSelectList from '../ProductSelectList';

const valuesSchema = Yup.object().shape({
    productName: Yup.string()
        .required('required!')
        .min(8, 'Words cannot be less than 8!')
        .max(30, 'Words should be less than 30!'),
    cid: Yup.string().required('required!'),
    productColors: Yup.array().of(Yup.string()).min(1, 'required!'),
    productSizes: Yup.array().min(1, 'required!'),
    productPrice: Yup.number().required('required!'),
    productImgs: Yup.array()
        .of(
            Yup.mixed().test('fileFormat', 'Invalid file format', value => {
                if (value instanceof FileList) {
                    for (let i = 0; i < value.length; i++) {
                        const file = value.item(i);
                        if (!file.type.includes('image/')) {
                            return false;
                        }
                    }
                    return true;
                } else {
                    return true;
                }
            })
        )
        .min(1, 'Picture is required!')
        .required('Required!'),
    productContent: Yup.string()
        .required('required!')
        .min(50, 'Words cannot be less than 50!')
        .max(550, 'Words should be less than 550!')
});


const ProductForm = ({ item }) => {

    const setFieldValueRef = useRef();
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const {
        _id: product_id,
        cid,
        product_name,
        product_colors,
        product_sizes,
        product_price,
        product_sale,
        product_popularity,
        product_imgs,
        product_content
    } = item || {};

    const initialValues = {
        cid: cid || '',
        productName: product_name || '',
        productColors: product_colors || [],
        productSizes: product_sizes || [],
        productPrice: product_price || '',
        isSale: product_sale || false,
        isPopularity: product_popularity || false,
        productImgs: product_imgs || [],
        productContent: product_content || '',
    };

    useEffect(() => {

        if (item) {

            for (const [key, value] of Object.entries(initialValues)) {
                setFieldValueRef.current(key, value);
            }
        }

    }, [item])

    const handleFormSubmit = (values) => {

        const productInfo = new FormData();

        const product = {
            cid: values.cid,
            product_name: values.productName,
            product_price: values.productPrice,
            product_popularity: values.isPopularity,
            product_sale: values.isSale,
            product_content: values.productContent,
        };
        for (const [key, value] of Object.entries(product)) {
            productInfo.append(key, value);
        }

        for (const color of values.productColors) {
            productInfo.append('product_colors', color);
        }

        for (const size of values.productSizes) {
            productInfo.append('product_sizes', size);
        }

        for (const img of values.productImgs) {
            if (img.imgFile) {
                productInfo.append('product_imgs', img.imgFile);
            } else {
                productInfo.append('product_imgs', img);
            }
        }

        if (product_id) {
            dispatch({
                type: manageTypes.CREATE_PRODUCT_REQUEST,
                payload: productInfo
            });

        } else {
            dispatch({
                type: manageTypes.UPDATE_PRODUCT_REQUEST,
                payload: { product_id, productInfo },
            });
            onCloseInterface();
        }
    };

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={valuesSchema}
            onSubmit={handleFormSubmit}
        >
            {({ handleSubmit, setFieldValue, isSubmitting }) => {

                setFieldValueRef.current = setFieldValue;
                return (
                    <Form onSubmit={handleSubmit} className="my-2 d-flex flex-column">
                        < FormikGroup label="Product Name" fieldName="productName">
                            {({ field }) => <Form.Control className="w-75"  {...field} />}
                        </FormikGroup>
                        <hr />
                        < FormikGroup label="Product Category" fieldName="cid">
                            {({ field }) => <ProductSelectList className="w-75"  {...field} />}
                        </FormikGroup>
                        <hr />
                        < FormikGroup label=" Product Color" fieldName="productColors">
                            {({ field, form: { values } }) =>
                                <div className="d-flex flex-wrap w-75">
                                    {PRODUCT_COLORS.map(color => (
                                        <Form.Check
                                            key={color}
                                            type="checkbox"
                                            label={color}
                                            checked={values.productColors.indexOf(color) != -1}
                                            className={`m-2 font-content px-3 border bg-${color} ${setTextColor(color) ? 'text-black' : 'text-white'
                                                }`}
                                            rows={3}
                                            {...field}
                                            value={color}
                                        />
                                    ))}
                                </div>
                            }
                        </FormikGroup>
                        <hr />
                        < FormikGroup label="Product Size" fieldName="productSizes">
                            {({ field, form: { values } }) =>
                                < div className="d-flex align-items-center w-75">
                                    {PRODUCT_SIZES.map(size => (
                                        <Form.Check
                                            key={size}
                                            type="checkbox"
                                            label={size}
                                            checked={values.productSizes.indexOf(size) != -1}
                                            className="font-content me-2"
                                            {...field}
                                            value={size}
                                        />
                                    ))}
                                </div>
                            }
                        </FormikGroup>
                        <hr />
                        < FormikGroup label="Product Price" fieldName="productPrice">
                            {({ field }) => <Form.Control className="w-75"  {...field} />}
                        </FormikGroup>
                        <hr />
                        < FormikGroup label="Status" fieldName="isSale">
                            {({ field, form: { values } }) => (
                                <Form.Check
                                    type="switch"
                                    checked={values.isSale}
                                    className="font-content ms-2 w-75"
                                    {...field}
                                />
                            )}
                        </FormikGroup>
                        <hr />
                        <FormikGroup label="Popular" fieldName="isPopularity">
                            {({ field, form: { values } }) => (
                                <Form.Check
                                    type="switch"
                                    checked={values.isPopularity}
                                    className="ms-2 w-75"
                                    {...field}
                                />
                            )}
                        </FormikGroup>
                        <hr />
                        <FormikGroup label="Product Images" fieldName="productImgs">
                            {({ field, form: { values, setFieldValue } }) => (
                                <div className="w-75">
                                    <UploadButton
                                        accept='image/*'
                                        multiple={true}
                                        onChange={event =>
                                            getImageSrc({
                                                event,
                                                fieldName: 'productImgs',
                                                setFieldValue,
                                                values: values.productImgs,
                                            })
                                        }
                                    />
                                </div>
                            )}
                        </FormikGroup>
                        <FieldArray name="productImgs">{({ remove, form: { values } }) =>
                            <ImgList
                                imgsFile={values.productImgs}
                                product_id={item?._id}
                                remove={remove}
                            />
                        }</FieldArray>
                        <hr />
                        < FormikGroup label="Product Detail" fieldName="productContent">
                            {({ field }) => <Form.Control as="textarea" className="w-75" rows={3} {...field} />}
                        </FormikGroup>
                        <hr />
                        <Button type="submit" variant="secondary" className="align-self-end font-btn fs-5">
                            Create Product
                        </Button>
                    </Form>
                )
            }}
        </Formik>
    )
}

export default ProductForm;