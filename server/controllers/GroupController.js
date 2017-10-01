
import db from '../models';


const GroupController = {

  /**
   *  - Create a group
   * @method
   * @memberof GroupController
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @return {function} a response object of the group created
   */
  createGroup(req, res) {
    const { name, description } = req.body;
    if (name && description) {
      db.Groups.findOrCreate({
        where: { name },
        defaults: {
          description,
          creator: req.decoded.username
        }
      }).spread((group, created) => {
        if (created) {
          group.addUser(req.decoded.userId);
          return res.status(201).json({
            id: group.id,
            name: group.name,
            description: group.description,
            creator: group.creator
          });
        }
        return res.status(409).json({ msg: 'Group already exist' });
      }).catch(err => res.status(400).json({ msg: err.errors[0] }));
    } else {
      res.json({ msg: 'Name, Description required' });
    }
  },

  /** Retrieve all Group the User belongs to
   * @method
   * @memberof GroupController
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
      if(user) {
        user.getGroups({
          attributes: ['id', 'name', 'description', 'creator', 'createdAt'],
          joinTableAttributes: []
        }).then(groups => res.status(200).json({ groups: groups}));
      } else {
        res.status(401).json({msg: 'User does not exist'})
      }
    }).catch(error => res.status(500).json({
      message: 'server error'
    }));
  },

  /** Add User To Group
   * @method
   * @memberof GroupController
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns User object that was added to a group
   */

  addUserToGroup(req, res) {
    const groupId = req.params.id;
    const members = [].concat(req.body.members);
    db.Groups.findOne({
      where: {
        id: groupId
      }
    }).then((group) =>{
      if(group) {
        db.Users.findAll({
          where: {
            username: members
          }
        }).then((user) => {
          if(user.length !== 0) {
            group.addUsers(user).then((groupUsers) => {
              if (groupUsers.length !== 0) {
                return res.status(200).json({
                  msg: 'User added successfully to group'
                })
              }
              return res.status(409).json({
                msg: 'User already a member of this group'
              })
            })
          } else {
            res.status(404).json({
              msg: 'User does not exist'
            })
          }
        })
      } else {
        res.status(404).json({
          msg: 'Group Does not exist'
        })
      }
    })
  },


   /** Retrieves all Users of a Group
   *  @method
   * @memberof GroupController
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns all Group members
   */

  retrieveGroupMembers(req, res) {
    db.Groups.findOne({
      where: {
        id: req.params.id
      }
    }).then((group) => {
      if (group) {
        group.getUsers({
          attributes: ['id', 'username', 'email', 'phoneNumber', 'createdAt'],
          joinTableAttributes: []
        })
         .then(groups => res.status(200).json({'groupMembers':groups}));
      } else {
        return res.status(404).json({ message: 'Group does not exist' });
      }
    });
  },
};

export default GroupController;
