const bcrypt  = require("bcrypt");
const User = require("../models/User.js");
const { generateAuthToken, verifyAuthToken } =  require("./token.js");



const signin = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password))
    return res.status(400).json({ msg: "Email and password required." });

  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "Email is not registered." });

  const isCorrect = await bcrypt.compare(password, user.password);
  if (!isCorrect) {
    return res.status(400).json({ msg: "Password is incorrect, try again." });
  }

  const token = generateAuthToken({ email });
  return res
    .header("x-auth-token", token)
    .json({ msg: "Authenticated successfully." });
};

const signup = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body);
  if (!(email && password))
    return res.status(400).json({ msg: "Email and password required." });

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    await User.create({ email, password: hashedPassword });
    res.json({ msg: "user created successfully" });
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports ={
  signup,
  signin

}
