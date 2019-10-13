const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../config/db");

module.exports = {
  login: async (req, res, next) => {
    try {
      const user = await db.models.user.findOne({
        where: {
          email: req.body.email
        }
      });

      if (!user) {
        throw new Error("User doesn't exist");
      }

      const isEqual = await bcrypt.compare(req.body.password, user.password);

      if (!isEqual) {
        throw new Error("Email and  password is incorrect");
      }

      const token = jwt.sign(
        {
          userId: user.id,
          email: user.email
        },
        "thisismysuperlongsscret",
        { expiresIn: 60 * 60 }
      );

      return res.status(200).send({
        userId: user.id,
        token,
        tokenExpiration: 60 * 60
      });
    } catch (err) {
      next(err);
    }
  }
};
