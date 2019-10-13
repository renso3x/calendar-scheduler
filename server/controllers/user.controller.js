const bcrypt = require("bcrypt");
const db = require("../config/db");

module.exports = {
  createUser: async (req, res, next) => {
    try {
      const exisitingUser = await db.models.user.findOne({
        where: {
          email: req.body.email
        }
      });

      if (exisitingUser) {
        throw new Error("User exists already");
      }

      const hashedPassword = await bcrypt.hash(req.body.password, 10);

      await db.models.user.create({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email.toLowerCase(),
        password: hashedPassword
      });

      return res
        .status(200)
        .send({ success: true, message: "Successfully created a user." });
    } catch (e) {
      next(e);
    }
  }
};
