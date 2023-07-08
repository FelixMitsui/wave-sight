/** @format */

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { Button, Col, Form, Row } from 'react-bootstrap';
import { Formik, Field, ErrorMessage, FieldArray } from 'formik';
import * as Yup from 'yup';
import ImgList from '../../../components/ImgList';
import Loading from '../../../components/Loading';
import { FoldIcon } from '../../../Icons';
import {
    PRODUCT_CATEGORIES,
    PRODUCT_COLORS,
    PRODUCT_PARTS,
    PRODUCT_SIZES,
} from '../../../utils/constants/productForm';
import UploadButton from '../../../components/UploadButton';
import { getImageSrc } from '../../../utils/tools/getImageSrc';
import { setTextColor } from '../../../utils/tools/setTextColor';
import { manageTypes } from '../../../redux/manageModule';


const valuesSchema = Yup.object().shape({
    nameText: Yup.string()
        .required('required!')
        .min(8, 'Words cannot be less than 8!')
        .max(30, 'Words should be less than 30!'),
    colorsCheckBox: Yup.array().of(Yup.string()).min(1, 'required!'),
    sizesCheckBox: Yup.array().min(1, 'required!'),
    categoryRadio: Yup.string().required('required!'),
    partRadio: Yup.string().required('required!'),
    priceText: Yup.number().required('required!'),
    imagesFile: Yup.array()
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
    contentTextarea: Yup.string()
        .required('required!')
        .min(50, 'Words cannot be less than 50!')
        .max(550, 'Words should be less than 550!'),
    // detailImagesFile: Yup.array().of(Yup.object()).min(1, 'picture is required!').required('required!')
});

const Create = ({ item, isDisplay, onCloseInterface }) => {
    const { isLoading } = useSelector(state => state.manage);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {
        _id: product_id,
        product_name,
        product_colors,
        product_sizes,
        product_category,
        product_part,
        product_price,
        product_sale,
        product_new,
        product_popularity,
        product_images,
        product_content,
        product_detail_images,
    } = item || {};

    const initialValues = {
        nameText: product_name || '',
        colorsCheckBox: product_colors || [],
        sizesCheckBox: product_sizes || [],
        categoryRadio: product_category || [],
        partRadio: product_part || '',
        priceText: product_price || '',
        isSaleSwitch: product_sale || false,
        isNewSwitch: product_new || false,
        isPopularSwitch: product_popularity || false,
        imagesFile: product_images || [],
        contentTextarea: product_content || '',
        detailImagesFile: product_detail_images || [],
    };
    const upload = {
        accept: 'image/*',
        multiple: true,
    };
    const handleFormSubmit = (values) => {
        const productInfo = new FormData();

        const product = {
            product_name: values.nameText,
            product_category: values.categoryRadio,
            product_part: values.partRadio,
            product_price: values.priceText,
            product_new: values.isNewSwitch,
            product_popularity: values.isPopularSwitch,
            product_sale: values.isSaleSwitch,
            product_content: values.contentTextarea,
        };
        for (const [key, value] of Object.entries(product)) {
            productInfo.append(key, value);
        }

        for (const color of values.colorsCheckBox) {
            productInfo.append('product_colors', color);
        }

        for (const size of values.sizesCheckBox) {
            productInfo.append('product_sizes', size);
        }

        for (const image of values.imagesFile) {
            if (image.imageFile) {
                productInfo.append('product_images', image.imageFile);
            } else {
                productInfo.append('product_images', image);
            }
        }

        if (!product_id) {
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
        <>
            {isLoading ? <Loading /> : null}
            <div className="bg-gray">
                <h1 className="border font-title mt-2 text-center text-white">Create Product</h1>
            </div>
            <Row className="border m-2 min-vh-100 p-2">
                <Col>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={valuesSchema}
                        onSubmit={handleFormSubmit}
                    >
                        {({ handleSubmit, isSubmitting }) => (
                            <Form onSubmit={handleSubmit}>
                                <Form.Group>
                                    <Form.Label column sm md="auto" className="font-content fs-5 me-1">
                                        Product Name :
                                    </Form.Label>
                                    <Field type="text" name="nameText" placeholder=" product name" />
                                    <ErrorMessage name="nameText">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                </Form.Group>
                                <hr />
                                <Form.Group className="d-flex flex-wrap  mt-2">
                                    <Form.Label className="font-content fs-5 me-1">
                                        Product Color :
                                    </Form.Label>
                                    <Field name="colorsCheckBox">
                                        {({ field, form: { values } }) =>
                                            PRODUCT_COLORS.map(color => (
                                                <Form.Check
                                                    key={color}
                                                    type="checkbox"
                                                    label={color}
                                                    checked={values.colorsCheckBox.indexOf(color) != -1}
                                                    className={`m-2 font-content px-3 border bg-${color} ${setTextColor(color) ? 'text-black' : 'text-white'
                                                        }`}
                                                    rows={3}
                                                    {...field}
                                                    value={color}
                                                />
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="colorsCheckBox">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                </Form.Group>
                                <hr />
                                <Form.Group className="d-flex flex-row mt-2">
                                    <Form.Label className="font-content fs-5 me-2">Product Size :</Form.Label>
                                    <Field name="sizesCheckBox">
                                        {({ field, form: { values } }) =>
                                            PRODUCT_SIZES.map(size => (
                                                <Form.Check
                                                    key={size}
                                                    type="checkbox"
                                                    label={size}
                                                    checked={values.sizesCheckBox.indexOf(size) != -1}
                                                    className="font-content me-2"
                                                    {...field}
                                                    value={size}
                                                />
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="sizesCheckBox">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                </Form.Group>
                                <hr />
                                <Form.Group className="d-flex flex-row mt-2">
                                    <Form.Label className="font-content fs-5 me-2">
                                        Product Category :
                                    </Form.Label>
                                    <Field name="categoryRadio">
                                        {({ field, form: { values } }) =>
                                            PRODUCT_CATEGORIES.map(category => (
                                                <Form.Check
                                                    key={category}
                                                    type="radio"
                                                    label={category[0].toUpperCase() + category.slice(1)}
                                                    checked={values.categoryRadio.indexOf(category) != -1}
                                                    className="font-content me-2"
                                                    {...field}
                                                    value={category}
                                                />
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="categoryRadio">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                </Form.Group>
                                <hr />
                                <Form.Group className="d-flex flex-row mt-2">
                                    <Form.Label className="font-content fs-5 me-2">Product Part :</Form.Label>
                                    <Field name="partRadio">
                                        {({ field, form: { values } }) =>
                                            PRODUCT_PARTS.map(part => (
                                                <Form.Check
                                                    key={part}
                                                    type="radio"
                                                    label={part[0].toUpperCase() + part.slice(1)}
                                                    checked={values.partRadio.indexOf(part) != -1}
                                                    className="font-content me-2"
                                                    {...field}
                                                    value={part}
                                                />
                                            ))
                                        }
                                    </Field>
                                    <ErrorMessage name="partRadio">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-3">
                                    <Form.Label className="font-content fs-5 me-2">Product Price :</Form.Label>
                                    <Field name="priceText" type="text" placeholder=" price number" />
                                    <ErrorMessage name="priceText">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                </Form.Group>
                                <hr />
                                <Form.Group className="d-flex mb-3">
                                    <Form.Label className="font-content fs-5">Status</Form.Label>
                                    <Field name="isSaleSwitch">
                                        {({ field, form: { values } }) => (
                                            <Form.Check
                                                type="switch"
                                                checked={values.isSaleSwitch}
                                                className="font-content ms-2"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                </Form.Group>
                                <Form.Group className="d-flex mb-3">
                                    <Form.Label className="font-content fs-5">New Product</Form.Label>
                                    <Field name="isNewSwitch">
                                        {({ field, form: { values } }) => (
                                            <Form.Check
                                                type="switch"
                                                checked={values.isNewSwitch}
                                                className="ms-2"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                </Form.Group>
                                <hr />
                                <Form.Group className="d-flex mb-3">
                                    <Form.Label className="font-content fs-5">Popular</Form.Label>
                                    <Field name="isPopularSwitch">
                                        {({ field, form: { values } }) => (
                                            <Form.Check
                                                type="switch"
                                                checked={values.isPopularSwitch}
                                                className="ms-2"
                                                {...field}
                                            />
                                        )}
                                    </Field>
                                </Form.Group>
                                <hr />
                                <Form.Group className="mb-3">
                                    <Form.Label className="font-content fs-5 me-2">Product Images :</Form.Label>
                                    <Field name="imagesFile">
                                        {({ field, form: { values, setFieldValue } }) => (
                                            <UploadButton
                                                {...upload}
                                                onChange={event =>
                                                    getImageSrc({
                                                        event,
                                                        fieldName: 'imagesFile',
                                                        setFieldValue,
                                                        values: values.imagesFile,
                                                    })
                                                }
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="imagesFile">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                    <FieldArray name="imagesFile">
                                        {({ remove, form: { values, setFieldValue } }) => (
                                            <ImgList
                                                imagesFile={values.imagesFile}
                                                setFieldValue={setFieldValue}
                                                remove={remove}
                                            />
                                        )}
                                    </FieldArray>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="font-content fs-5 me-2">Product Detail :</Form.Label>
                                    <Field name="contentTextarea">
                                        {({ field }) => <Form.Control as="textarea" rows={3} {...field} />}
                                    </Field>
                                    <ErrorMessage name="contentTextarea">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label className="font-content fs-5 me-2">Detail Images:</Form.Label>
                                    <Field name="detailImagesFile">
                                        {({ field, form: { values, setFieldValue } }) => (
                                            <UploadButton
                                                {...upload}
                                                onChange={event =>
                                                    getImageSrc({
                                                        event,
                                                        fieldName: 'detailImagesFile',
                                                        setFieldValue,
                                                        values: values.detailImagesFile,
                                                    })
                                                }
                                            />
                                        )}
                                    </Field>
                                    <ErrorMessage name="detailImagesFile">
                                        {error => (
                                            <Form.Label className="d-flex fw-bold me-1 text-red">{error}</Form.Label>
                                        )}
                                    </ErrorMessage>
                                    <FieldArray name="detailImagesFile">
                                        {({ remove, form: { values, setFieldValue } }) => (
                                            <ImgList
                                                imagesFile={values.detailImagesFile}
                                                setFieldValue={setFieldValue}
                                                remove={remove}
                                            />
                                        )}
                                    </FieldArray>
                                </Form.Group>
                                <Button type="submit" variant="secondary" className="font-btn fs-5">
                                    Create Product
                                </Button>
                            </Form>
                        )}
                    </Formik>
                    {isDisplay ? (
                        <FoldIcon
                            className="end--50 position-relative"
                            onClick={() => onCloseInterface()}
                            viewBox="0 0 18 18"
                            width="33"
                            height="33"
                        />
                    ) : null}
                </Col>
            </Row>
        </>
    );
};

export default Create;
