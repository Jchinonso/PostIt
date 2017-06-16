import GroupCtrl from '../controllers/GroupCtr'

const GroupRoutes = (router) => {
    router.route('/group')
    .post(GroupCtrl.create);

}

export default GroupRoutes;
