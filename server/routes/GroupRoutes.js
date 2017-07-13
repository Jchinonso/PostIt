import GroupCtrl from '../controllers/GroupCtr';

const GroupRoutes = (router) => {
  router.route('/group')
      .post(GroupCtrl.createGroup);

  router.route('/group/:id/user')
      .post(GroupCtrl.addUserToGroup)
      .get(GroupCtrl.retrieveGroupUsers);
};

export default GroupRoutes;
