import React, { FC } from "react";
import { Form } from "react-bootstrap";
import { ErrorMessage, Field } from "formik";

type FormikProps = {
    label: string;
    fieldName: string;
    children: any;
}

const FormikGroup: FC<FormikProps> = ({ label, fieldName, children }) => {

    return (
        <div className="my-3 d-flex flex-column">
            <Form.Group className="px-2">
                <Form.Label column className="font-content fs-5 me-1 text-center fw-bold">
                    {label}
                </Form.Label>
                <Field name={fieldName}>{children}</Field>
            </Form.Group>
            <ErrorMessage name={fieldName}>
                {error => (
                    <p className=" fw-bold me-1 text-red text-center">{error}</p>
                )}
            </ErrorMessage>
        </div>
    )
}

export default FormikGroup;
