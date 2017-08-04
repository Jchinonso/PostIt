import GroupCtrl from '../controllers/GroupCtr';
import Auth from '../middleware/Auth';

const GroupRoutes = (router) => {
  router.route('/group')
      .post(Auth.verifyToken, GroupCtrl.createGroup);

  router.route('/group/:id/user')
      .post(Auth.verifyToken, GroupCtrl.addUserToGroup)
      .get(Auth.verifyToken, GroupCtrl.retrieveGroupUsers);
};

export default GroupRoutes;
