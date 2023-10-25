import React from "react";
import { Card, Placeholder } from "react-bootstrap";

function CardPlaceholder() {

    return (
        <Card className="w-100">
            <Card.Img
                variant="top"
                style={{ aspectRatio: '8/13' }}
                src={require(`${process.env.ASSETS_PATH}placeholder.png`).default}
            />
            <Card.Body className="d-flex flex-column">
                <Placeholder as={Card.Title} animation="glow">
                    <Placeholder xs={12} size="lg" />
                </Placeholder>
                <div className="d-flex flex-column flex-grow-1 justify-content-end">
                    <Placeholder as={Card.Text} className="text-end" animation="glow">
                        <Placeholder xs={8} size="lg" />
                    </Placeholder>
                </div>
            </Card.Body>
        </Card>
    )
}

export default CardPlaceholder;