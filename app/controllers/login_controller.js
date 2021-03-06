const mongoose = require('mongoose');
const Saller = mongoose.model('Saller');
const bcrypt = require('bcrypt');
const { getError } = require('./../utils/getErros');

module.exports = {
  async LoginController (req, res) {
    try {
      const { email, password } = req.body;
      
      let user = await Saller.findOne({ email }).select('+password');
      if(!user) throw new Error("Please verify email or password");

      const compare = await bcrypt.compare(password, user.password);
      if (!compare) throw new Error('user-or-password-incorrect');
  
      return res.status(200).send({ accessToken: user.token });
    } catch (error) {
      console.log(error);
      const e = getError(error);
      return res.status(e.code).json(e);
    }
  }
};
