/** @format */

import * as React from 'react';
import type { Node } from "react"
import { useDispatch } from 'react-redux'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup';
import ImgList from '../../../components/ImgList'
import { FoldIcon } from '../../../Icons'
import { PRODUCT_CATEGORIES, PRODUCT_COLORS, PRODUCT_PARTS, PRODUCT_SIZES } from '../../../util/constants/productForm'
import UploadButton from '../../../components/UploadButton'
import { getImageSrc } from '../../../util/getImageSrc'
import { setTextColor } from '../../../util/setTextColor';
import { manageTypes } from '../../../redux/manageModule';

const valuesSchema = Yup.object().shape({
  nameText: Yup.string().required('required!').min(8, 'Words cannot be less than 8!').max(30, 'Words should be less than 30!'),
  colorsCheckBox: Yup.array().of(Yup.string()).min(1, 'required!'),
  sizesCheckBox: Yup.array().min(1, 'required!'),
  categoryRadio: Yup.string().required('required!'),
  partRadio: Yup.string().required('required!'),
  priceText: Yup.number().required('required!'),
  imagesFile: Yup.array()
    .of(
      Yup.mixed()
        .test('fileFormat', 'Invalid file format', value => {
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
  contentTextarea: Yup.string().required('required!').min(50, 'Words cannot be less than 50!').max(550, 'Words should be less than 550!'),
  // detailImagesFile: Yup.array().of(Yup.object()).min(1, 'picture is required!').required('required!')
})

const Create = ({ productValue, handleClose }) => {
  const dispatch = useDispatch()
  const {
    _id,
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
    product_detail_images
  } = productValue || {}

  const initialValues = {
    nameText: product_name,
    colorsCheckBox: product_colors || [],
    sizesCheckBox: product_sizes || [],
    categoryRadio: product_category || [],
    partRadio: product_part || '',
    priceText: product_price,
    isSaleSwitch: product_sale || false,
    isNewSwitch: product_new || false,
    isPopularSwitch: product_popularity || false,
    imagesFile: product_images,
    contentTextarea: product_content,
    detailImagesFile: product_detail_images || []
  }
  const upload = {
    accept: 'image/*',
    multiple: true
  }
  const onFormSubmit = async (values) => {
    const formData = new FormData();
    if (_id) {
      formData.append('_id', _id)
    }
    formData.append('product_name', values.nameText)
    formData.append('product_category', values.categoryRadio)
    values.colorsCheckBox.forEach(color => {
      formData.append('product_colors', color);
    });
    values.sizesCheckBox.forEach(size => {
      formData.append('product_sizes', size)
    });
    formData.append('product_part', values.partRadio)
    formData.append('product_price', values.priceText)
    formData.append('product_new', values.isNewSwitch)
    formData.append('product_popularity', values.isPopularSwitch)
    formData.append('product_sale', values.isSaleSwitch)
    formData.append('product_content', values.contentTextarea)
    values.imagesFile.forEach(file => {
      if (file.imageFile) {
        delete file.imageUrl;
        formData.append('product_images', file.imageFile);
      } else {
        formData.append('product_images', file);
      }
    })
    // if (values.detailImagesFile && values.detailImagesFile !== '') {
    //   values.detailImagesFile.forEach(file => {
    //     delete file.imageUrl
    //     formData.append('product_detail_images', file.imageFile);
    //   });
    formData.append('product_detail_images', values.detailImagesFile);
    if (_id === undefined) {
      await dispatch({ type: manageTypes.CREATE_PRODUCT_REQUEST, payload: formData })
    } else {
      await dispatch({ type: manageTypes.UPDATE_PRODUCT_REQUEST, payload: formData })
    }
    handleClose(false)
  }

  return (
    <Container className="mt-2">
      <h1
        style={{ fontFamily: "fantasy" }}
        className="mt-2 bg-gray border  text-white d-flex justify-content-center"
      >
        Create New Product
      </h1>
      <Formik initialValues={initialValues}
        validationSchema={valuesSchema}
        onSubmit={(values) => onFormSubmit(values)}
      >{({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>
            <Col>
              <Form.Label column sm md="auto" className="me-1 fs-5 font-content">
                Product Name :
              </Form.Label>
              < Field type="text" name="nameText" placeholder="product name" />
            </Col>
            <ErrorMessage name="nameText">{(error) => <Form.Label
              className="fw-bold me-1 text-red  d-flex"
            >
              {error}
            </Form.Label>}</ErrorMessage>
          </Form.Group>
          <hr />
          <Form.Group as={Row}>
            <Form.Label column sm md="auto" className="fs-5 font-content">
              Product Color :
            </Form.Label>
            <Col className="mt-2 d-flex flex-row flex-wrap">
              <Field name="colorsCheckBox">
                {({ field, form: { values } }) =>
                  PRODUCT_COLORS.map((color) => (
                    <Form.Check
                      key={color}
                      type="checkbox"
                      label={color}
                      checked={values.colorsCheckBox.indexOf(color) != -1}
                      className={`m-2 font-content px-3 border bg-${color} ${setTextColor(color) ? "text-black" : "text-white"}`}
                      rows={3}
                      {...field}
                      value={color}
                    />
                  ))}
              </Field>
            </Col>
            <ErrorMessage name="colorsCheckBox">{(error) =>
              <Form.Label className="fw-bold me-1 text-red  d-flex">
                {error}
              </Form.Label>}
            </ErrorMessage>
          </Form.Group>
          <hr />
          <Form.Group as={Row}>
            <Form.Label column sm md="auto" className="fs-5 font-content">
              Product Size :
            </Form.Label>
            <Col className="mt-2 d-flex flex-row">
              <Field name="sizesCheckBox">{
                ({ field, form: { values } }) =>
                  PRODUCT_SIZES.map((size) => (
                    <Form.Check
                      key={size}
                      type="checkbox"
                      label={size}
                      checked={values.sizesCheckBox.indexOf(size) != -1}
                      className="me-2 font-content"
                      {...field}
                      value={size}
                    />))
              }</Field>
            </Col>
            <ErrorMessage name="sizesCheckBox">{(error) =>
              <Form.Label className="fw-bold me-1 text-red  d-flex">
                {error}
              </Form.Label>}
            </ErrorMessage>
          </Form.Group>
          <hr />
          <Form.Group as={Row}>
            <Form.Label column sm md="auto" className="fs-5 font-content">
              Product Category :
            </Form.Label>
            <Col className="mt-2 d-flex flex-row">
              <Field name="categoryRadio">{
                ({ field, form: { values } }) =>
                  PRODUCT_CATEGORIES.map((category) => (
                    <Form.Check
                      key={category}
                      type="radio"
                      label={category[0].toUpperCase() + category.slice(1)}
                      checked={values.categoryRadio.indexOf(category) != -1}
                      className="me-2 font-content"
                      {...field}
                      value={category}
                    />
                  ))}
              </Field>
            </Col>
            <ErrorMessage name="categoryRadio">{(error) =>
              <Form.Label className="fw-bold me-1 text-red  d-flex">
                {error}
              </Form.Label>}
            </ErrorMessage>
          </Form.Group>
          <hr />
          <Form.Group as={Row}>
            <Form.Label column sm md="auto" className="fs-5 font-content">
              Product Part :
            </Form.Label>
            <Col className="mt-2 d-flex flex-row">
              <Field name="partRadio">{
                ({ field, form: { values } }) =>
                  PRODUCT_PARTS.map((part) =>
                    <Form.Check
                      key={part}
                      type="radio"
                      label={part[0].toUpperCase() + part.slice(1)}
                      checked={values.partRadio.indexOf(part) != -1}
                      className="me-2 font-content"
                      {...field}
                      value={part}
                    />)}
              </Field>
            </Col>
            <ErrorMessage name="partRadio">{(error) =>
              <Form.Label className="fw-bold me-1 text-red  d-flex">
                {error}
              </Form.Label>}
            </ErrorMessage>
          </Form.Group>
          <hr />
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm md="auto" className="fs-5 me-1 font-content">
                Product Price :
              </Form.Label>
              <Field name="priceText" type="text" placeholder="price number" />
            </Col>
            <ErrorMessage name="priceText">{(error) =>
              <Form.Label className="fw-bold me-1 text-red  d-flex">
                {error}
              </Form.Label>}
            </ErrorMessage>
          </Form.Group>
          <hr />
          <Form.Group className="mb-3 d-flex " >
            <Form.Label className="fs-5 font-content">Status</Form.Label>
            <Field name="isSaleSwitch"  >
              {({ field, form: { values } }) =>
                <Form.Check
                  type="switch"
                  checked={values.isSaleSwitch}
                  className="ms-2 font-content"
                  {...field}
                />}
            </Field>
          </Form.Group>
          <Form.Group className="mb-3 d-flex " >
            <Form.Label className="fs-5 font-content">New Product</Form.Label>
            <Field name='isNewSwitch'>
              {({ field, form: { values } }) =>
                <Form.Check
                  type="switch"
                  checked={values.isNewSwitch}
                  className="ms-2"
                  {...field}
                />}
            </Field>
          </Form.Group>
          <hr />
          <Form.Group className="mb-3 d-flex " >
            <Form.Label className="fs-5 font-content">Popular</Form.Label>
            <Field name='isPopularSwitch'>
              {({ field, form: { values } }) =>
                <Form.Check
                  type="switch"
                  checked={values.isPopularSwitch}
                  className="ms-2"
                  {...field}
                />}
            </Field>
          </Form.Group>
          <hr />
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm md="auto" className="fs-5 font-content">
                Product Images :
              </Form.Label>
              <Field name="imagesFile">{({ field, form: { values, setFieldValue } }) =>
                <UploadButton
                  {...upload}
                  onChange={(event) => getImageSrc({
                    event,
                    fieldName: "imagesFile",
                    setFieldValue,
                    values: values.imagesFile
                  })} />
              }</Field>
              <ErrorMessage name="imagesFile">{(error) =>
                <Form.Label className="fw-bold me-1 text-red  d-flex">
                  {error}
                </Form.Label>}
              </ErrorMessage>
            </Col>
            <FieldArray name="imagesFile">{({ remove, form: { values, setFieldValue } }) =>
              <ImgList
                imagesFile={values.imagesFile}
                setFieldValue={setFieldValue}
                remove={remove}
              />
            }</FieldArray>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm md="auto" className="fs-5 font-content">
                Product Detail :
              </Form.Label>
              <Field name="contentTextarea">
                {({ field }) => <Form.Control
                  as="textarea"
                  rows={3}
                  {...field}
                />}
              </Field>
              <ErrorMessage name="contentTextarea">{(error) =>
                <Form.Label
                  className="fw-bold me-1 text-red d-flex"
                >
                  {error}
                </Form.Label>}
              </ErrorMessage>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Col>
              <Form.Label column sm md="auto" className="fs-5 font-content">
                Detail Images:
              </Form.Label>
              <Field name="detailImagesFile">{({ field, form: { values, setFieldValue } }) =>
                <UploadButton
                  {...upload}
                  onChange={(event) => getImageSrc({
                    event,
                    fieldName: "detailImagesFile",
                    setFieldValue,
                    values: values.detailImagesFile
                  })} />
              }</Field>
              <ErrorMessage name="detailImagesFile">{(error) =>
                <Form.Label className="fw-bold me-1 text-red  d-flex">
                  {error}
                </Form.Label>}
              </ErrorMessage>
            </Col>
            <FieldArray name="detailImagesFile">{({ remove, form: { values, setFieldValue } }) =>
              <ImgList
                imagesFile={values.detailImagesFile}
                setFieldValue={setFieldValue}
                remove={remove}
              />
            }</FieldArray>
          </Form.Group>
          <Button type="submit" variant="secondary" className=' fs-5 font-btn'>
            Create Product
          </Button>
        </Form>
      )}</Formik>
      {
        handleClose ? (
          <FoldIcon
            className="position-relative  end--50"
            onClick={() => handleClose(false)}
            viewBox="0 0 18 18"
            width="33"
            height="33"
          />) : null
      }
    </Container >)
}
export default Create

