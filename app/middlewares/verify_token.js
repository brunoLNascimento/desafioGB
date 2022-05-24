const jwt = require('jsonwebtoken');

const verifyToken = (req, res, done) => {
  try {
    const token = req.get('authorization');
    const secret = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, secret);

    req.payload = decoded;

    done();
  } catch(error) {
    console.log(error);
    res.status(500).json(error);
  }
};

export default verifyToken;