import React from "react";
import { ButtonGroup } from "react-bootstrap";
import LiftingArrow from "../LiftingArrow";
import ServiceListGroup from "../ServiceListGroup";


export default function AsideGroup() {


    return (
        <aside>
            <ServiceListGroup />
            <ButtonGroup>
                <LiftingArrow />
            </ButtonGroup>
        </aside>

    )
}
