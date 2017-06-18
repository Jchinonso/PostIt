import MessageCtrl from '../controllers/MessageCtr'

const MessageRoutes = (router) => {
     router.route('/group/:id/message')
      .post(MessageCtrl.createMessage)
      .get(MessageCtrl.retrieveAllMessages);
}

export default MessageRoutes;
