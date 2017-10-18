import db from '../models';
import urgentCriticalNotification from '../utils/urgentCriticalNotification'


const MessageController = {
  /** CreateMessage
   * @desc  Creates Message that partains to a group
   *
   * @method
   *
   * @memberof MessageController
   *
   * @param {Object}  req, res
   *
   * @returns {object} Returns created message
   */
  createMessage(req, res) {
    const { content, priority } = req.body;
    if (content) {
      db.Groups.findOne({
        where: {
          id: req.params.id
        }
      }).then((group) => {
        if (group) {
          db.Messages.create({
            content,
            priority,
            groupId: req.params.id,
            sender: req.decoded.username
          }).then((messageCreated) => {
            if(messageCreated.priority === 'urgent' || messageCreated.priority === 'critical') {
              group.getUsers({
                attributes: ['email'],
                joinTableAttributes: []
              }).then((foundDetails) => {
                const emails = foundDetails.map(email => email.email)
                urgentCriticalNotification(group, req.decoded.username);
              })
            }
            res.status(201).json({
              id: messageCreated.id,
              content: messageCreated.content,
              sender: messageCreated.sender,
              priority: messageCreated.priority,
              isRead: messageCreated.isRead,
              createdAt: messageCreated.createdAt
            });
          })
        } else {
          return res.status(404).json({ msg: 'Group doesnt exist' });
        }
      });
    } else {
      return res.status(400).json({ msg: 'Content cannot be empty'})
    }

  },

  /** RetrieveAllMessages
   * @desc Retrieve all message that partains to Group
   *
   * @method
   *
   * @memberof MessageController
   *
   * @param {Object} req, res
   *
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
        }).then(messages => res.status(200).json({messages}));
      } else {
        return res.status(404).json({ msg: 'Group not found' });
      }
    }).catch((error) => {
      res.status(500).json({
        msg: 'Internal Server Error'
      })
    });
  }
};

export default MessageController;
