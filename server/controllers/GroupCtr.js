
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
      }
    }).spread((group, created) => {
      if (created) {
        return res.status(200).send(group);
      }
      return res.status(409).send({ message: 'Group already exist' });
    }).catch((err) => {
      res.status(409).send({
        message: 'unexpected error occured'
      });
    });
  },  
    
  /** Add User To Group
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns User
   */

  addUserToGroup(req, res) {
    const id = req.params.id;
    db.Users.find({
      where: {
        username: req.body.username,
      }
    }).then((user) => {
      if (user) {
        db.UserGroups.findOrCreate({
          where: {
            userId: user.id, groupId: id 
          }
        }).spread((userGroup, created) => {
          if (created) {
            return res.status(201).send({
              message: 'user successfully added to group'
            });
          } else {
            return res.status(400).send({
              message: 'unable to add user to group'
            });
          }
        });
      } else {
        return res.status(409).send({
          message: 'user doesnt exist'
        });
      }
    });
  },


    /** Retrieves all Users of a Group
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns Group Users
   */

  retrieveGroupUsers(req, res) {
    db.UserGroups.findAll({
      where: {
        groupId: req.params.id
      }
    }).then((users) => {
      return res.status(200).send(users);
    }).catch((err) => {
      return res.status(404).send(err);
    });
  },
};

export default GroupCtrl;
