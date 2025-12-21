// controller/schoolUserController.js
const schoolUser = require("../model/schoolUserController");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const secretKey = "ashishrahulmanishjiteshkavishpalkesh";

exports.userSignup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name && email && password)) {
    return res.status(400).send({ message: "all input field are required" });
  }

  const existing = await schoolUser.findOne({ email });
  if (existing) {
    return res.status(400).send({ message: "user already exists" });
  }

  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const data = { name, email, password: hash };

  const signupUser = await schoolUser.create(data);
  console.log(">>signup>>", signupUser);
  return res.status(201).send(signupUser);
};

exports.userLogin = async (req, res) => {
  const { email, password } = req.body;
  if (!(email && password)) {
    return res.status(400).send({ message: "all input field are required" });
  }

  const existUser = await schoolUser.findOne({ email });
  if (!existUser) {
    return res.status(400).send({ message: "user not found" });
  }

  const isMatch = await bcrypt.compare(password, existUser.password);
  console.log(">>>isMatch>>", isMatch);

  if (!isMatch) {
    return res.status(400).send({ message: "invalid user" });
  }

  const token = jwt.sign({ email }, secretKey);
  console.log("<<<<token<<<", token);
  res.status(200).json({
    message: "login successful",
    data: existUser,
    token,
  });
};
