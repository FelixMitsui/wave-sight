import React, { useEffect } from "react"
import { Col, Image, Row } from 'react-bootstrap'
import uuid from "react-uuid"
import { CrossIcon } from "../../../src/Icons"
import PropTypes from 'prop-types';
import { BACKEND_IMAGE_URL } from '../../util/constants/url'

const ImgList = ({ imagesFile, remove }) => {


    const handleDeleteImg = (imageFile) => {
        const imgIndex = imagesFile.indexOf(imageFile)
        remove(imgIndex)
    }
    return (
        <Row >
            {imagesFile?.map((imageFile) => (
                <Col
                    sm={3}
                    md={3}
                    lg={3}
                    key={uuid()}
                    className="mt-2 position-relative">

                    <div
                        className="position-absolute start-80"
                        onClick={() => handleDeleteImg(imageFile)}
                    >
                        <CrossIcon
                            viewBox="0 0 18 18"
                            width="30"
                            height="30"
                        />
                    </div>
                    <div className="py-2  d-flex justify-content-center">
                        <Image
                            thumbnail={true}
                            width={100}
                            height={100}
                            className=""
                            src={
                                imageFile.imageUrl || `${BACKEND_IMAGE_URL}/${imageFile.originalname}`
                            }
                        />
                    </div>
                </Col >
            ))
            }
        </Row>
    )
}

// ImgList.propTypes = {
//     imagesFile: PropTypes.arrayOf(PropTypes.object)
// }
// ImgList.defaultProps = {
//     imagesFile: []
// }

export default ImgList