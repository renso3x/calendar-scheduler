const _ = require('lodash');
const Faker = require('faker');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const { newTimeParser } = require('../utils/schedule');

const DATABASE = {
  database: process.env.DATABASE || 'scheduler',
  username: process.env.DB_USERNAME || 'root',
  password: process.env.DB_PASSWORD || 'password'
};

const Conn = new Sequelize(
  DATABASE.database,
  DATABASE.username,
  DATABASE.password,
  {
    host: 'localhost',
    dialect: 'mysql'
  }
);

const Schedule = Conn.define('schedule', {
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

const User = Conn.define('user', {
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
  console.log('Nice~ Database looks fine');
  const event = [
    { start: 0, duration: 15, title: 'Excercise' },
    { start: 25, duration: 30, title: 'Travel to work' },
    { start: 30, duration: 30, title: 'Plan day' },
    { start: 60, duration: 15, title: "Review yesterday's commits" },
    { start: 100, duration: 15, title: 'Code review' },
    { start: 180, duration: 90, title: 'Have lunch with John' },
    { start: 360, duration: 30, title: 'Have lunch with John' },
    { start: 370, duration: 45, title: 'Have lunch with John' },
    { start: 405, duration: 30, title: 'Have lunch with John' }
  ];
  const hashedPassword = await bcrypt.hash('password', 10);
  return User.create({
    firstName: Faker.name.firstName(),
    lastName: Faker.name.lastName(),
    email: 'admin@admin.com',
    password: hashedPassword
  })
    .then(user => {
      _.forEach(event, async evt => {
        const { success, start, end } = newTimeParser(evt.start, evt.duration);
        if (success) {
          await user.createSchedule({
            ...evt,
            start,
            end
          });
        }
      });
      // });
    })
    .catch(error => {
      console.log(error, 'Something went wrong with the Database Update!');
    });
});

module.exports = Conn;
