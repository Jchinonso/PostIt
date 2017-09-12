import MessageController from '../controllers/MessageController';
import Auth from '../middleware/Auth';

const MessageRoutes = (router) => {
  router.route('/group/:id/message')
    .post(Auth.verifyToken, MessageController.createMessage)
    .get(Auth.verifyToken, MessageController.retrieveAllMessages);
};

export default MessageRoutes;
