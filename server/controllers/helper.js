import bcrypt from 'bcrypt';


const helper= {

    /** validate plain password against hashed password
     * @param {object} user
     * @param {String} password
     * @return {Boolean} return validity of the password
     */
    validatePassword(user, password){
        return bcrypt.compareSync(password, user.password);
    }

}

export default helper;