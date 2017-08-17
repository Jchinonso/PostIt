
import db from '../models';


const GroupCtrl = {

  /**
   *  - Create a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  createGroup(req, res) {
    db.Groups.findOrCreate({
      where: { name: req.body.name },
      defaults: {
        description: req.body.description,
        creator: req.decoded.username
      }
    }).spread((group, created) => {
      if (created) {
        group.addUser(req.decoded.userId);
        return res.status(201).send({
          id: group.id,
          name: group.name,
          description: group.description,
          creator: group.creator
        });
      }
      return res.status(409).send({ message: 'Group already exist' });
    });
  },
  /** Retrieve all Group of a User
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns all user Groups
   */

  retrieveAllGroup(req, res) {
    db.Users.findOne({
      where: {
        username: req.decoded.username
      }
    }).then((user) => {
      user.getGroups().then((groups) => {
        if (groups.length === 0) {
          return res.status(200).send({
            message: 'You do not belong to any group'
          });
        }
        return res.status(200).send(groups);
      });
    }).catch(error => res.status(500).send({
      message: 'server error'
    }));
  },
  /** Add User To Group
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns User
   */

  addUserToGroup(req, res) {
    const groupId = req.params.id;
    db.Groups.findOne({
      where: {
        id: groupId
      }
    }).then((group) => {
      if (group) {
        db.Users.findOne({
          where: {
            username: req.body.username,
          }
        }).then((user) => {
          if (user) {
            db.UserGroups.findOrCreate({
              where: { $and: {
                groupId: req.params.id,
                userId: user.id
              } },
              defaults: {
                groupId: req.params.id,
                userId: user.id
              }
            }).spread((userGroup, created) => {
              if (created) {
                return res.status(201).send({
                  message: 'successfully added user to group'
                });
              }
              return res.status(409).send({
                message: 'user already exist'
              });
            });
          } else {
            return res.status(400).send({
              message: 'User does not exist'
            });
          }
        });
      } else {
        return res.status(400).send({
          message: 'Group does not exist'
        });
      }
    });
  },


    /** Retrieves all Users of a Group
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns Group Users
   */

  retrieveGroupMembers(req, res) {
    db.Groups.findOne({
      where: {
        id: req.params.id
      }
    }).then((group) => {
      if (group) {
        group.getUsers()
         .then(groups => res.status(200).send(groups));
      } else {
        return res.status(404).send({ message: 'Group does not exist' });
      }
    });
  },
};

export default GroupCtrl;
