const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getError } = require('./../utils/getErros');
const verifier = require('email-verifier');
const Verifier = require('email-verifier');

module.exports = {
    async LoginController (req, res) {
      try {

        const { email, password } = req.body;
        const user = await UserModel.findOne({ email }).select('+password');
        const compare = await bcrypt.compare(password, user.password);
    
        if (!compare) {
          throw new Error('user-or-password-incorrect');
        }
    
        const userRoles = await UserRolesModel.findOne({ user: user._id });
    
        const secret = process.env.JWT_SECRET;
        const payload = userRoles.toObject();
        payload.userId = payload.user;
        delete payload.user;
        delete payload._id;
        delete payload.__v;
        const token = jwt.sign(payload, secret);
    
        res.status(200).send({ accessToken: token });
      } catch (error) {
        console.log(error)
        const e = getError(error)
        res.status(e.code).json(e);
      }
    }
}
