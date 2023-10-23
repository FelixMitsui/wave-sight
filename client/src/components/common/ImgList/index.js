
import React from 'react';
import { useDispatch } from 'react-redux';
import { Col, Image, Row, Figure } from 'react-bootstrap';
import uuid from 'react-uuid';
import ConfirmButton from '../ConfirmButton';
import withModal from '../../../HOC/withModal';
import { manageTypes } from '../../../redux/manageModule';

const ImgList = ({ imgsFile, product_id, remove }) => {

    const dispatch = useDispatch();

    const ConfirmButtonWithModal = withModal(ConfirmButton);

    const handleDeleteImg = imgFile => {

        dispatch({ type: manageTypes.DELETE_PRODUCT_IMG_REQUEST, payload: { product_id, imgFile } });

        const imgIndex = imgsFile.indexOf(imgFile);
        remove(imgIndex);
    };

    return (
        <Row sm={2} md={3} lg={4}>
            {imgsFile?.map(imgFile => (
                <Col key={uuid()} className="mt-2 position-relative">
                    <ConfirmButtonWithModal
                        title="Are you sure to delete?"
                        btnName=""
                        className="position-absolute top-0 end-0 bg-light-gray"
                        onClick={() => handleDeleteImg(imgFile)}
                    >
                        <i className="bx bx-x fs-3" />
                    </ConfirmButtonWithModal>
                    <Figure className=" py-2">
                        <Image
                            thumbnail={true}
                            src={imgFile.imgUrl || imgFile}
                        />
                    </Figure>
                </Col>
            ))
            }
        </Row >
    );
};

export default ImgList;
