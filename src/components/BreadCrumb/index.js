/** @format */

import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

const BreadCrumb = props => {
    const matchName = location.pathname.startsWith('/wave-sight')
        ? location.pathname.substring('/wave-sight'.length)
        : location.pathname;
    return (
        <Breadcrumb className="m-3">
            {props.matches.map((match, index) => {
                const { path, breadcrumbName } = match.route;
                const isActive = match.pathname === matchName;

                return isActive ? (
                    <Breadcrumb.Item className="font-content fs-5 fw-bold" key={index} active>
                        {breadcrumbName === 'Detail' ? props.name : breadcrumbName}
                    </Breadcrumb.Item>
                ) : (
                    <Breadcrumb.Item className="font-content fs-5 fw-bold" key={index}>
                        <NavLink to={path}>{breadcrumbName}</NavLink>
                    </Breadcrumb.Item>
                );
            })}
        </Breadcrumb>
    );
};
export default BreadCrumb;
