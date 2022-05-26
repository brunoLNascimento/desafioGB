const mongoose = require('mongoose');
const Saller = mongoose.model('Saller');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const { getError } = require('./../utils/getErros');
const secret = process.env.JWT_SECRET;

module.exports = {
  async LoginController (req, res) {
    try {
      const { email, password } = req.body;
      const token = req.headers.authorization;
      let user = await Saller.findOne({ email }).select('+password');

      const compare = await bcrypt.compare(password, user.password);
  
      if (!compare) throw new Error('user-or-password-incorrect');
  
      return res.status(200).send({ accessToken: token });
    } catch (error) {
      console.log(error)
      const e = getError(error)
      return res.status(e.code).json(e);
    }
  }
}
