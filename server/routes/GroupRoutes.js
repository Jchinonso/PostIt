import GroupCtrl from '../controllers/GroupCtr'

const GroupRoutes = (router) => {
    router.route('/group')
    .post(GroupCtrl.create);

    router.route('/group/:id/user')
    .post(GroupCtrl.addUser);
}

export default GroupRoutes;
