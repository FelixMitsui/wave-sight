import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';
import { Formik, FieldArray } from 'formik';
import ImgList from '../../common/ImgList';
import {
    PRODUCT_COLORS,
    PRODUCT_SIZES,
} from '../../../utils/constants/productForm';
import UploadButton from '../../common/UploadButton';
import { getImageSrc } from '../../../utils/tools/getImageSrc';
import { setTextColor } from '../../../utils/tools/setTextColor';
import { manageTypes } from '../../../redux/manageModule';
import FormikGroup from '../../common/FormikGroup';
import ProductSelectList from '../ProductSelectList';
import { valuesSchema } from './constants';


const ProductForm = ({ product }) => {

    const setFieldValueRef = useRef(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

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
    } = product || {};

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

        if (product) {

            for (const [key, value] of Object.entries(initialValues)) {
                setFieldValueRef.current(key, value);
            }
        }

    }, [product])

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
                type: manageTypes.UPDATE_PRODUCT_REQUEST,
                payload: { product_id, productInfo },
            });
        } else {

            dispatch({
                type: manageTypes.CREATE_PRODUCT_REQUEST,
                payload: productInfo
            });
        }

        navigate('/manage/products')
    };

    return (

        <Formik
            initialValues={initialValues}
            validationSchema={valuesSchema}
            onSubmit={handleFormSubmit}
        >
            {({ handleSubmit, setFieldValue }) => {

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
                            {({ form: { values, setFieldValue } }) => (
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
                                product_id={product?._id}
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