import UsersCtrl from '../controllers/UserCtr';
import Auth from '../middleware/Auth';

const UserRoutes = (router) => {
  router.route('/user')
    .get(Auth.verifyToken, UsersCtrl.showUsers);

  router.route('/user/signup')
    .post(UsersCtrl.signUp);

  router.route('/user/signin')
    .post(UsersCtrl.signIn);
  router.route('/user/signOut')
    .post(UsersCtrl.signOut);
};

export default UserRoutes;
