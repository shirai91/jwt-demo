const jwt = require('jsonwebtoken');
const fs = require('fs');

const privateKey = fs.readFileSync('test_jwt');
const publicKey = fs.readFileSync('test_jwt.pub');
/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.sign = (req, res) => {
  let message = req.query.message
  try {
    const token = jwt.sign({ message }, privateKey, { algorithm: 'RS256' });
    res.status(200).send(token);
  } catch (e) {
    res.status(400).send(e.message)
  }
};

/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
exports.verify = (req, res) => {
  const token = req.query.token;
  try {
    const decoded = jwt.verify(token, publicKey, { algorithm: 'RS256' });
    res.status(200).json({ data: decoded });
  } catch (e) {
    res.status(400).send(e.message);
  }
};
