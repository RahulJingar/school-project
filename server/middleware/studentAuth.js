const jwt = require("jsonwebtoken");
const schoolUser = require("../model/schoolUserController");
const secretKey = "ashishrahulmanishjiteshkavishpalkesh";

module.exports = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(400).json({ message: "token is not found" });
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({ message: "user is not found" });
    }

    const decode = jwt.verify(token, secretKey);
    const email = decode.email;
    const existUser = await schoolUser.findOne({ email });
    if (!existUser) {
      return res.status(400).json({ message: "user not found" });
    }

    req.user = existUser;
    next();
  } catch (error) {
    return res.status(500).json({ message: "internal server error", error });
  }
};
