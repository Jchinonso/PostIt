import MessageCtrl from '../controllers/MessageCtr';
import Auth from '../middleware/Auth';

const MessageRoutes = (router) => {
  router.route('/group/:id/message')
    .post(Auth.verifyToken, MessageCtrl.createMessage)
    .get(Auth.verifyToken, MessageCtrl.retrieveAllMessages);
};

export default MessageRoutes;
