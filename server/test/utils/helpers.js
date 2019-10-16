const Promise = require('bluebird');
const jwt = require('jsonwebtoken');
const Sequelize = require('sequelize');
const db = require('../../config/db');

const events = [
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

const users = [
  {
    firstName: 'John',
    lastName: 'Doe',
    email: 'john@doe.com',
    password: '123'
  }
];

const _generateSchedule = () => {
  return Promise.map(events, async event => {
    return db.models.schedule
      .findOrCreate({ where: { title: event.title } })
      .get(0);
  });
};

const _generateUsers = () => {
  return Promise.map(users, async user => {
    return db.models.user
      .findOrCreate({
        where: {
          email: user.email
        }
      })
      .get(0);
  });
};

const _getOneRandomSchedule = async () => {
  await _generateSchedule();
  return db.models.schedule.findOne({ order: [Sequelize.fn('RAND')] });
};

const _getOneRandomUser = async () => {
  await _generateUsers();
  return db.models.user.findOne({ order: [Sequelize.fn('RAND')] });
};

module.exports = {
  cleanDatabase: () =>
    Promise.all(
      Object.keys(db.models).map(key => {
        if (['sequelize', 'Sequelize'].includes(key)) return null;
        return db.models[key].destroy({ where: {}, force: true });
      })
    ),
  generateSchedules: () => _generateSchedule(),
  getOneRandomSchedule: () => _getOneRandomSchedule(),
  getOneRandomUser: () => _getOneRandomUser(),
  generateUsers: () => _generateUsers(),
  generateSchedule: async () => {
    const user = await _getOneRandomUser();
    db.model.schedule.create({
      title: 'Go to bed',
      start: 0,
      duration: 150,
      userId: user.id
    });
  },
  withLogin: async (req, user = { email: 'john@doe.com', password: '123' }) => {
    const newUser = await User.findOrCreate({
      where: { email: user.email, password: user.password }
    });
    const authToken = jwt.sign({ user: newUser }, 'supersecret');
    return req.set('Authorization', `Bearer ${authToken}`);
  }
};
