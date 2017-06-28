import UsersCtrl from '../controllers/UserCtr'

const UserRoutes = (router) => {
    router.route('/user')
    .get(UsersCtrl.showUsers);

    router.route('/user/signup')
    .post(UsersCtrl.signUp);

    router.route('/user/signin')
    .post(UsersCtrl.signIn);
}

export default UserRoutes;
