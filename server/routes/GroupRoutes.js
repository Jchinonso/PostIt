import Auth from '../middleware/Auth';
import GroupController from '../controllers/GroupController';

const GroupRoutes = (router) => {
  router.route('/group')
      .post(Auth.verifyToken, GroupController.createGroup)
      .get(Auth.verifyToken, GroupController.retrieveAllGroup);

  router.route('/group/:id/user')
      .post(Auth.verifyToken, GroupController.addUserToGroup)
      .get(Auth.verifyToken, GroupController.retrieveGroupMembers);
};

export default GroupRoutes;
