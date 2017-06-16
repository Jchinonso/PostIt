
import db from '../models';



const GroupCtrl = {

  /**
   *  - Create a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  create(req, res) {
     db.Groups.findOrCreate(
      {where: {name: req.body.name}, defaults:
       {description: req.body.description}})
  .spread((group, created) => {
    if(!created){
      return res.status(409).send({message: "Group already exist"})
    } else {
      return res.status(200).send(group)
    }
  })
      
   },
}
 

export default GroupCtrl;
