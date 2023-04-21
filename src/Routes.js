import React from "react"
import { useRoutes, } from "react-router-dom";
import { routes } from "./routesList";

const RoutesElement = () => {
    const routesval = useRoutes(routes)
    return routesval
}
export default RoutesElement

