/** @format */

import React from 'react';
import { Breadcrumb } from 'react-bootstrap';
import { routes } from '../../../router/routeList';
import { NavLink, matchRoutes, useLocation } from 'react-router-dom';
import { CID_BREADCRUMB_GROUP } from '../../../utils/constants/cidBreadcrumb';

const BreadCrumb = props => {

    const location = useLocation();

    const matches = matchRoutes(routes, location.pathname);
    const cidGroup = CID_BREADCRUMB_GROUP[props.cid]

    return (
        <Breadcrumb className="m-3">

            {matches.map((match, index) => {
                const { path, breadcrumbName, children } = match.route;
                const isActive = match.pathname === location.pathname;

                if (breadcrumbName === 'Products') {

                    const { breadcrumbName, path, subcategory } = cidGroup;

                    if (subcategory && !subcategory.subcategory) {

                        const { breadcrumbName: innerBreadcrumbName } = subcategory;

                        return (
                            <div className="d-flex  mx-1" key={index}>
                                <span className="mx-1  fw-bold align-self-center">/</span>
                                <Breadcrumb.Item className="font-content fw-bold" >
                                    <NavLink to={path}>{breadcrumbName}</NavLink>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item className="font-content fw-bold" active>
                                    {innerBreadcrumbName}
                                </Breadcrumb.Item>
                            </div>
                        )
                    } else if (subcategory?.subcategory) {

                        const { breadcrumbName: lastBreadcrumbName, path: lastPath } = subcategory.subcategory
                        return (
                            <div className="d-flex mx-1" key={index}>
                                <span className="mx-1  align-self-center">/</span>
                                <Breadcrumb.Item className="font-content fw-bold">
                                    <NavLink to={path}>{breadcrumbName}</NavLink>
                                </Breadcrumb.Item>
                                <Breadcrumb.Item className="font-content fw-bold">
                                    <NavLink to={subcategory.path}>{subcategory.breadcrumbName}</NavLink>
                                </Breadcrumb.Item>
                                {
                                    index !== matches.length - 1 ?
                                        <>
                                            <Breadcrumb.Item className="font-content fw-bold" >
                                                <NavLink to={lastPath}>{lastBreadcrumbName}</NavLink>
                                            </Breadcrumb.Item >
                                            <span className="mx-1  align-self-center">/</span>
                                        </>
                                        :
                                        <Breadcrumb.Item className="font-content fw-bold" active>
                                            <span>{lastBreadcrumbName}</span>
                                        </Breadcrumb.Item>
                                }
                            </div>)
                    } else {
                        return (
                            <Breadcrumb.Item className="font-content fw-bold" key={index} active>
                                {breadcrumbName}
                            </Breadcrumb.Item>
                        )
                    }
                }

                if (breadcrumbName === 'Detail') {
                    return <Breadcrumb.Item className="font-content fw-bold" key={index} active>
                        <span>{props?.name}</span> </Breadcrumb.Item>

                } else if (isActive) {
                    return <Breadcrumb.Item className="font-content fw-bold" key={index} active>
                        <span>{breadcrumbName}</span>
                    </Breadcrumb.Item>
                } else {
                    return <Breadcrumb.Item className="font-content fw-bold" key={index}>
                        <NavLink to={path}>{breadcrumbName}</NavLink>
                    </Breadcrumb.Item>
                }
            })}
        </Breadcrumb >)
}

export default BreadCrumb;
