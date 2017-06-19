
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
       where: {name: req.body.name}, 
       defaults: {
         description: req.body.description
        }})
        .spread((group, created) => {
          if(!created){
             return res.status(409).send({
               message: "Group already exist"
              })}
               else {
                 return res.status(200).send(group)
              }
            })
   },

    
    /** Add User To Group
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns User
   */

   addUserToGroup(req, res) {
     const id = req.params.id;
     db.Users.findOne({where:{username: req.body.username}}).then(user =>{
       if(user){
         const newUserId = user.id;
         db.UserGroups.findOrCreate(
            {where: {userId: newUserId, groupId: id}, 
            defaults:{userId: newUserId,groupId: id}})
        .spread((userGroup, created) => {
          if(!created){
            return res.status(409).send({message: "user already exist"})
          } else {
            return res.status(201).send(userGroup)
          }
        })
       } else {
         return res.status(404).send({message: "This User does not exist"})
       }
     }).catch(err =>{
       return res.status(500).send(err)
     })
    },


    /** Retrieves all Users of a Group
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {object} Returns Group Users
   */

    retrieveGroupUsers(req, res){
      db.UserGroups.findAll({
        where: {
          groupId: req.params.id
        }}).then(users => {
          return res.status(200).send(users);
        })
        .catch(err => {
          return res.status(404).send(err);
        })
    },

   
}
 

export default GroupCtrl;
