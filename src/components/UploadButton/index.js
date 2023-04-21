import React, { useRef } from 'react';
import { Form, Button } from 'react-bootstrap';
import { UploadIcon } from '../../Icons';

const UploadButton = ({ onChange = () => { }, ...upload }) => {

    const { accept, multiple } = upload;
    const inputFileRef = useRef();
    const handleOnChange = (event) => {
        console.log("uploaded " + event.target.files.length + " images")
        onChange(event);
        inputFileRef.current.value = null
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
            <Button
                variant="outlined"
                onClick={() => inputFileRef.current.click()}
            >
                <UploadIcon
                    viewBox="0 0 18 18"
                    width="30"
                    height="30"
                />
                <h6 className='font-content'>Upload</h6>
            </Button>
        </>
    );
};

export default UploadButton;