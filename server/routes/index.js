import UsersRoutes from './UserRoutes';
import GroupRoutes from './GroupRoutes'


// setup routes using router
const Routes = (router) => {
  UsersRoutes(router);
  GroupRoutes(router);
};

export default Routes;