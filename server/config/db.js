const moment = require("moment");
const _ = require("lodash");
const Faker = require("faker");
const Sequelize = require("sequelize");
const bcrypt = require("bcrypt");

const Conn = new Sequelize("scheduler", "root", "password", {
  host: "localhost",
  dialect: "mysql"
});

const Schedule = Conn.define("schedule", {
  start: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  duration: {
    type: Sequelize.INTEGER,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

const User = Conn.define("user", {
  firstName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  lastName: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

//Relationship
User.hasMany(Schedule);
Schedule.belongsTo(User);

Conn.sync({ force: true }).then(() => {
  //seeder
  // _.times(10, async () => {
  //   const hashedPassword = await bcrypt.hash("test", 10);
  //   return User.create({
  //     firstName: Faker.name.firstName(),
  //     lastName: Faker.name.lastName(),
  //     email: Faker.internet.email(),
  //     password: hashedPassword
  //   });
  // });
});

module.exports = Conn;
