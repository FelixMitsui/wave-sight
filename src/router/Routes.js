/** @format */

import * as React from 'react';
import { useRoutes } from 'react-router-dom';
import { routes } from './routesList';

const Routes = () => {
 const routesval = useRoutes(routes);
 return routesval;
};
export default Routes;
