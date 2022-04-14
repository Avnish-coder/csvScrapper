const jwt = require("jsonwebtoken")

const PRIVATE_KEY = "AvnishKumarSharma";

const generateAuthToken = (payload) => {
  return jwt.sign(payload, PRIVATE_KEY);
};

const verifyAuthToken = (token) => {
  try {
    const decoded = jwt.verify(token, PRIVATE_KEY);
    return decoded;
  } catch (err) {
    return null;
  }
};

module.exports =  { generateAuthToken, verifyAuthToken };
