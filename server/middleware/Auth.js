import db from '../models';
import jwt from 'jsonwebtoken';


const secret = process.env.JWT_SECRET_TOKEN || 'Keep my secret';

const Auth = {
  isAuthenticated(req, res, next){
    const authToken = req.header('x-auth');
    if(!authToken){
      return res.status(401).send({ message: 'Unauthorized Access' });
    }
    jwt.verify(authToken, secret, (err, decoded) => {
      if (err) {
        return res.status(401).send({ message: 'Invalid Token' })
      }
     db.Users.findById(decoded.UserId).then(user => {
      if(!user){
       return res.status(401).send({ message: 'please login' }); 
      }
      req.decoded = decoded;
      req.user = user;
      next();
    })
   });
    
  }
}
export default Auth;