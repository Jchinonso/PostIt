import db from '../models';


const MessageCtrl = {
  /** Creates Message that partains to a group
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns created message
   */
  createMessage(req, res) {
    db.Groups.findOne({
      where: {
        id: req.params.id
      }
    }).then((group) => {
      if (group) {
        db.Messages.create({
          content: req.body.content,
          priority: req.body.priority,
          groupId: req.params.id,
          sender: req.decoded.username
        }).then(messageCreated => res.status(201).send({
          id: messageCreated.id,
          content: messageCreated.content,
          sender: messageCreated.sender,
          priority: messageCreated.priority,
          isRead: messageCreated.isRead,
          createdAt: messageCreated.createdAt
        }));
      } else {
        return res.status(409).send({ message: 'Group doesnt exist' });
      }
    });
  },

    /** Retrieve all message that partains to Group
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns all messages
   */
  retrieveAllMessages(req, res) {
    db.Groups.findOne({
      where: {
        id: req.params.id
      }
    }).then((group) => {
      if (group) {
        db.Messages.findAll({
          where: {
            groupId: req.params.id
          }
        }).then(messages => res.status(200).send(messages));
      } else {
        return res.status(404).send({ message: 'Group not found' });
      }
    });
  }
};

export default MessageCtrl;
