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
    type: Sequelize.STRING,
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

Conn.sync({ force: true }).then(async () => {
  // const event = [
  //   { start: 0, duration: 15, title: "Excercise" },
  //   { start: 25, duration: 30, title: "Travel to work" },
  //   { start: 30, duration: 30, title: "Plan day" },
  //   { start: 60, duration: 15, title: "Review yesterday's commits" },
  //   { start: 100, duration: 15, title: "Code review" },
  //   { start: 180, duration: 90, title: "Have lunch with John" },
  //   { start: 360, duration: 30, title: "Have lunch with John" },
  //   { start: 370, duration: 45, title: "Have lunch with John" },
  //   { start: 405, duration: 30, title: "Have lunch with John" }
  // ];
  // //seeder
  // const hashedPassword = await bcrypt.hash("password", 10);
  // return User.create({
  //   firstName: Faker.name.firstName(),
  //   lastName: Faker.name.lastName(),
  //   email: "admin@admin.com",
  //   password: hashedPassword
  // }).then(user => {
  //   _.forEach(event, async evt => {
  //     await user.createSchedule(evt);
  //   });
  // });
});

module.exports = Conn;
