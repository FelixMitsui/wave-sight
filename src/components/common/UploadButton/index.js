import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';


const UploadButton = ({ onChange = () => { }, ...upload }) => {

    const { accept, multiple } = upload;
    const inputFileRef = useRef();
    const handleOnChange = event => {
        onChange(event);
        inputFileRef.current.value = null;
    };

    return (
        <>
            <Form.Control
                type="file"
                style={{ display: 'none' }}
                onChange={handleOnChange}
                ref={inputFileRef}
                accept={accept || undefined}
                multiple={multiple || false}
            />
            <Button variant="outlined" onClick={() => inputFileRef.current.click()}>
                <i className="bx bx-down-arrow-circle fs-1" />
                <h6 className="font-content">Upload</h6>
            </Button>
        </>
    );
};

export default UploadButton;
