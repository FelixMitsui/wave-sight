/** @format */
//@flow
import * as React from 'react';
import type { Node } from "react"
import { useDispatch } from 'react-redux'
import { Button, Col, Container, Form, Row } from 'react-bootstrap'
import { Formik, Field, ErrorMessage, FieldArray } from 'formik'
import * as Yup from 'yup';
import { productActions } from '../../../redux/productModule'
import ImgList from '../../../components/ImgList'
import { FoldIcon } from '../../../Icons'
import { PRODUCT_CATEGORIES, PRODUCT_COLORS, PRODUCT_PARTS, PRODUCT_SIZES } from '../../../util/constants/productForm'
import UploadButton from '../../../components/UploadButton'
import { getImageSrc } from '../../../util/getImageSrc'
import { setTextColor } from '../../../util/setTextColor';

const valuesSchema = Yup.object().shape({
  nameText: Yup.string().required('required!').min(8, 'Words cannot be less than 8!').max(20, 'Words should be less than 30!'),
  colorsCheckBox: Yup.array().of(Yup.string()).min(1, 'required!'),
  sizesCheckBox: Yup.array().min(1, 'required!'),
  categoriesCheckBox: Yup.array().min(1, 'required!'),
  partRadio: Yup.string().required('required!'),
  priceText: Yup.number().required('required!'),
  imagesFile: Yup.array().of(Yup.object()).min(1, 'picture is required!').required('required!'),
  contentTextarea: Yup.string().required('required!').min(50, 'Words cannot be less than 50!').max(500, 'Words should be less than 500!'),
  detailImagesFile: Yup.array().of(Yup.object()).min(1, 'picture is required!').required('required!')
})

type Props = {
  handleClose: Object,
  productValue?: any,
}

const Create = ({ productValue, handleClose }: Props): React.Node => {

  const dispatch = useDispatch()

  const {
    product_name,
    product_colors,
    product_sizes,
    product_categories,
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
    categoriesCheckBox: product_categories || [],
    partRadio: product_part || '',
    priceText: product_price,
    isSaleSwitch: product_sale || false,
    isNewSwitch: product_new || false,
    isPopularSwitch: product_popularity || false,
    imagesFile: product_images,
    contentTextarea: product_content,
    detailImagesFile: product_detail_images
  }

  const upload = {
    accept: 'image/*',
    multiple: true
  }

  const onFormSubmit = (initValues: any) => {
    for (let i = 0; i < initValues.imagesFile.length; i++) {
      delete initValues.imagesFile[i].imageUrl
    }
    for (let i = 0; i < initValues.detailImagesFile.length; i++) {
      delete initValues.detailimagesFile[i].imageUrl
    }
    console.log(initValues)
    dispatch(productActions.createProduct())
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
        onSubmit={(initValues) => onFormSubmit(initValues)}
      >{({ handleSubmit, isSubmitting }) => (
        <Form onSubmit={handleSubmit}>
          <Form.Group as={Row}>

            <Col>
              <Form.Label column sm md="auto" className="fw-bold me-1">
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
            <Form.Label column sm md="auto" className="fw-bold">
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
                      className={`m-2 px-3 border bg-${color} ${setTextColor(color) ? "text-black" : "text-white"}`}
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
            <Form.Label column sm md="auto" className="fw-bold">
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
                      className="me-2"
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
            <Form.Label column sm md="auto" className="fw-bold">
              Product Category :
            </Form.Label>
            <Col className="mt-2 d-flex flex-row">
              <Field name="categoriesCheckBox">{
                ({ field, form: { values } }) =>
                  PRODUCT_CATEGORIES.map((category) => (
                    <Form.Check
                      key={category}
                      type="checkbox"
                      label={category[0].toUpperCase() + category.slice(1)}
                      checked={values.categoriesCheckBox.indexOf(category) != -1}
                      className="me-2"
                      {...field}
                      value={category}
                    />
                  ))}
              </Field>
            </Col>
            <ErrorMessage name="categoriesCheckBox">{(error) =>
              <Form.Label className="fw-bold me-1 text-red  d-flex">
                {error}
              </Form.Label>}
            </ErrorMessage>
          </Form.Group>
          <hr />
          <Form.Group as={Row}>
            <Form.Label column sm md="auto" className="fw-bold">
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
                      className="me-2"
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
              <Form.Label column sm md="auto" className="fw-bold me-1">
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
            <Form.Label className="fw-bold">Status</Form.Label>
            <Field name="isSaleSwitch"  >
              {({ field, form: { values } }) =>
                <Form.Check
                  type="switch"
                  checked={values.isSaleSwitch}
                  className="ms-2"
                  {...field}
                />}
            </Field>
          </Form.Group>
          <Form.Group className="mb-3 d-flex " >
            <Form.Label className="fw-bold">New Product</Form.Label>
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
            <Form.Label className="fw-bold">Popular</Form.Label>
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
              <Form.Label column sm md="auto" className="fw-bold">
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
              <Form.Label column sm md="auto" className="fw-bold">
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
              <Form.Label column sm md="auto" className="fw-bold">
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
          <Button type="submit" variant="secondary" disabled={isSubmitting}>
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
          />) : ""
      }
    </Container >)
}

export default Create

