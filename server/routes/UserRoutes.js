import UsersCtrl from '../controllers/UserCtr';
import Auth from '../middleware/Auth';
import Validation from '../middleware/Validation';

const UserRoutes = (router) => {
  router.route('/user')
    .get(Auth.verifyToken, UsersCtrl.showUsers);

  router.route('/user/signup')
    .post(Validation.validateSignUpInput, UsersCtrl.signUp);

  router.route('/user/signin')
    .post(Validation.validateSignInInput, UsersCtrl.signIn);
  router.route('/user/signOut')
    .post(UsersCtrl.signOut);
};

export default UserRoutes;
