
import db from '../models';
import helper from './helper';


const UsersCtrl = {

  /**
   * signUp - Create a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
  signUp(req, res) {
    db.Users.findOrCreate(
      {where: {email: req.body.email}, defaults:
       {username: req.body.username,
       password: req.body.password}})
  .spread((user, created) => {
    if(!created){
      return res.status(409).send({message: "user already exist"})
    } else {
      return res.status(201).send(user)
    }
  })
 },
 
 /**
   * signn - Log in a user
   * @param {Object} req Request Object
   * @param {Object} res Response Object
   * @returns {void} Returns void
   */
   signIn(req, res){
    const email = req.body.email;
    const password = req.body.password;


    db.Users.findOne({where:{email}})
      .then( user => {
          if(user && helper.validatePassword(user, password)){
             res.status(200)
                .send({message: "You have been loggedin successfully"});
          } else {
            res.status(400)
                  .send({message: "incorrect Email and password"});
          } 
      })
         
   }

}

export default UsersCtrl;
