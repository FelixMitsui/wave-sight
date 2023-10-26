import { useRoutes } from 'react-router-dom';
import { routes } from './routeList';

export default function RouteGroup() {

    const routeGroup = useRoutes(routes);
    return routeGroup;

};

