import db from '../models';


const MessageCtrl = {
    
    
      /** Creates Message that partains to a group
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns created message
   */
    createMessage(req, res) {
        db.Messages.create({
            content: req.body.content,
            priority: req.body.priority,
            groupId: req.params.id
          }).then(messageCreated => {
              return res.status(201).send(messageCreated);
          }).catch(err => {
            return res.status(400).send(err);
          })
      },

       /** Retrieve all message that partains to Group
       * @param {Object} req Request Object
       * @param {Object} res Response Object
       * @returns {object} Returns all messages
       */
      retrieveAllMessages(req, res){
        db.Messages.findAll({
          where: {
            groupId: req.params.id
          }}).then(messages => {
            return res.status(200).send(messages);
          }).catch(err => {
            return res.status(400).send(err);
          })
      }

}

export default MessageCtrl;