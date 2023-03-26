/** @format */

import React from 'react'
import { Breadcrumb } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

const BreadCrumb = (props) => {

  return (
    <Breadcrumb>

      {
        props.matches.map((match, index) => {
          const { path, breadcrumbName } = match.route
          const isActive = match.pathname === location.pathname

          return isActive ? (
            <Breadcrumb.Item
              key={index} active>
              {breadcrumbName}
            </Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={index}>
              <NavLink to={path}>
                {breadcrumbName}
              </NavLink>
            </Breadcrumb.Item>
          )
        })
      }

    </Breadcrumb>
  )
}
export default BreadCrumb
