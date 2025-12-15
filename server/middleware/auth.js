const jwt = require("jsonwebtoken");
const user = require("../model/schoolTeacherController");
const secretKey = "ashishrahulmanishjiteshkavishpalkesh";

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    console.log(`>>>authHeader>>>>`, authHeader);
    if (!authHeader) {
      return res.status(400).send({ message: "token is not found" });
    }

    const token = authHeader.split(" ")[1];
    console.log(`>>>>token>>>`, token);

    if (!token) {
      return res.status(400).send({ message: "user is not found" });
    }

    const decode = jwt.verify(token, secretKey);
    console.log(`>>>decode>>>`, decode);
    if (!decode) {
      return res.status(400).send({ message: "user not found" });
    }

    const email = decode.email;
    console.log(`>>email>>`, email);
    const existUser = await user.findOne({ email });
    console.log(`>>>>>existUser`, existUser);

    req.user = existUser;

    next();
  } catch (error) {
    res.status(500).send({ message: "internal server error", error });
  }
};
