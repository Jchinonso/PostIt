import UsersController from '../controllers/UserController';
import Auth from '../middleware/Auth';
import Validation from '../middleware/Validation';

const UserRoutes = (router) => {
  router.route('/user')
    .get(Auth.verifyToken, UsersController.showUsers);

  router.route('/user/signup')
    .post(Validation.validateSignUpInput, UsersController.signUp);

  router.route('/user/signin')
    .post(Validation.validateSignInInput, UsersController.signIn);
  router.route('/user/signOut')
    .post(UsersController.signOut);
};

export default UserRoutes;
