import UsersRoutes from './UserRoutes';
import GroupRoutes from './GroupRoutes'
import MessageRoutes from './MessageRoutes'


// setup routes using router
const Routes = (router) => {
  UsersRoutes(router);
  GroupRoutes(router)
  MessageRoutes(router)
};

export default Routes;