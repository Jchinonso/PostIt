import UsersController from '../controllers/UserController';
import Auth from '../middleware/Auth';

const UserRoutes = (router) => {
  router.route('/user')
    .get(UsersController.showUsers);

  router.route('/user/signup')
    .post(UsersController.signUp);

  router.route('/user/signin')
    .post(UsersController.signIn);
  router.route('/user/signOut')
    .post(UsersController.signOut);
};

export default UserRoutes;
