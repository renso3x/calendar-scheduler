process.env.NODE_ENV = 'test';

const sinon = require('sinon');
const request = require('request');
const chai = require('chai');
const should = chai.should();

const schedules = require('./fixtures/schedule.json');

const base = 'http://localhost:4000';

describe('Schedule API', () => {
  beforeEach(() => {
    this.get = sinon.stub(request, 'get');
    this.post = sinon.stub(request, 'post');
    this.put = sinon.stub(request, 'put');
    this.delete = sinon.stub(request, 'delete');
  });

  afterEach(() => {
    request.get.restore();
    request.post.restore();
    request.put.restore();
    request.delete.restore();
  });

  describe('GET /api/schedule', () => {
    it('should return all schedule', done => {
      this.get.yields(
        null,
        schedules.all.success.res,
        JSON.stringify(schedules.all.success.body)
      );
      request.get(`${base}/api/schedule`, (err, res, body) => {
        // there should be a 200 status code
        res.statusCode.should.eql(200);
        // the response should be JSON
        res.headers['content-type'].should.contain('application/json');
        // parse response body
        body = JSON.parse(body);
        // the JSON response body should have a
        // key-value pair of {"status": "success"}
        body.status.should.eql('success');
        // the JSON response body should have a
        // key-value pair of {"data": [3 movie objects]}
        body.data.length.should.eql(3);
        // the first object in the data array should
        // have the right keys
        body.data[0].should.include.keys('id', 'start', 'duration', 'title');
        // the first object should have the right value for name
        body.data[0].title.should.eql('Excercise');
        done();
      });
    });
  });

  describe('POST /api/schedule', () => {
    it('should return the schedule that was added', done => {
      const options = {
        body: {
          start: 120,
          duration: 30,
          title: 'Lunch Time',
          userId: 1
        },
        headers: {
          Authorization: 'Bearer 123aser234'
        },
        json: true,
        url: `${base}/api/schedule`
      };
      const obj = schedules.add.success;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      request.post(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'start',
          'duration',
          'title',
          'userId'
        );
        body.data[0].title.should.eql('Lunch Time');
        done();
      });
    });

    it('should throw an error if not authenticated on create schedule', done => {
      const options = {
        body: {
          start: 120,
          duration: 30,
          title: 'Lunch Time',
          userId: 1
        },
        json: true,
        url: `${base}/api/schedule`
      };
      const obj = schedules.noAuthenticated;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));

      request.post(options, (err, res, body) => {
        res.statusCode.should.equal(500);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Not Authenticated');
        should.exist(body.message);
        done();
      });
    });

    it('should throw an error if the schedule is not between 8am -5am', done => {
      const options = {
        body: { start: 600, duration: 15, title: 'Scrum meeting' },
        json: true,
        url: `${base}/api/schedule`
      };
      const obj = schedules.add.failure;
      this.post.yields(null, obj.res, JSON.stringify(obj.body));
      request.post(options, (err, res, body) => {
        res.statusCode.should.equal(400);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        should.exist(body.message);
        done();
      });
    });
  });

  describe('PUT /api/schedule/:id', () => {
    it('should throw an error if not authenticated on update schedule', done => {
      const options = {
        body: {
          id: 4,
          start: 90,
          duration: 30,
          title: 'Eat breafast'
        },
        json: true,
        url: `${base}/api/schedule/4`
      };
      const obj = schedules.noAuthenticated;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));

      request.put(options, (err, res, body) => {
        res.statusCode.should.equal(500);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Not Authenticated');
        should.exist(body.message);
        done();
      });
    });
    it('should throw an error if the schedule is not between 8am -5am', done => {
      const options = {
        body: {
          id: 4,
          start: 600,
          duration: 30,
          title: 'Eat breafast'
        },
        json: true,
        url: `${base}/api/schedule/4`
      };
      const obj = schedules.add.failure;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      request.put(options, (err, res, body) => {
        res.statusCode.should.equal(400);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        should.exist(body.message);
        done();
      });
    });

    it('should throw an error if schedule is not found', done => {
      const options = {
        body: {
          id: 10,
          start: 600,
          duration: 30,
          title: 'Eat breafast'
        },
        json: true,
        url: `${base}/api/schedule/10`
      };
      const obj = schedules.update.notFound;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      request.put(options, (err, res, body) => {
        res.statusCode.should.equal(500);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Schedule does not exist');

        should.exist(body.message);
        done();
      });
    });

    it('should return the schedule that was updated', done => {
      const options = {
        body: {
          id: 4,
          start: 90,
          duration: 30,
          title: 'Eat breafast',
          userId: 1
        },
        headers: {
          Authorization: 'Bearer 123aser234'
        },
        json: true,
        url: `${base}/api/schedule/4`
      };
      const obj = schedules.update.success;
      this.put.yields(null, obj.res, JSON.stringify(obj.body));
      request.put(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data[0].should.include.keys(
          'id',
          'start',
          'duration',
          'title',
          'userId'
        );
        body.data[0].title.should.eql('Eat breafast');
        done();
      });
    });
  });

  describe('DELETE /api/schedule/:id', () => {
    it('should throw an error if not authenticated on update schedule', done => {
      const options = {
        body: {
          id: 4,
          start: 90,
          duration: 30,
          title: 'Eat breafast'
        },
        json: true,
        url: `${base}/api/schedule/4`
      };
      const obj = schedules.noAuthenticated;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));

      request.delete(options, (err, res, body) => {
        res.statusCode.should.equal(500);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Not Authenticated');
        should.exist(body.message);
        done();
      });
    });

    it('should throw an error if schedule is not found', done => {
      const options = {
        body: {
          id: 10,
          start: 600,
          duration: 30,
          title: 'Eat breafast'
        },
        json: true,
        url: `${base}/api/schedule/10`
      };
      const obj = schedules.delete.notFound;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));
      request.delete(options, (err, res, body) => {
        res.statusCode.should.equal(500);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('error');
        body.message.should.eql('Sorry, unable to find scedule.');

        should.exist(body.message);
        done();
      });
    });

    it('should return sucess if schedule was delete', done => {
      const options = {
        body: {
          id: 3
        },
        headers: {
          Authorization: 'Bearer 123aser234'
        },
        json: true,
        url: `${base}/api/schedule/3`
      };
      const obj = schedules.delete.success;
      this.delete.yields(null, obj.res, JSON.stringify(obj.body));
      request.delete(options, (err, res, body) => {
        res.statusCode.should.equal(200);
        res.headers['content-type'].should.contain('application/json');
        body = JSON.parse(body);
        body.status.should.eql('success');
        body.data.message.should.eql('You have successfully deleted.');
        done();
      });
    });
  });
});
