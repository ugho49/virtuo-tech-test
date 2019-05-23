const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');
const Station = require('../src/models/station.model');
const Car = require('../src/models/car.model');
const expect = chai.expect;

// Configure chai
chai.use(chaiHttp);
chai.should();

const createStation = async (name) => {
  const station = new Station({name});
  return await station.save();
};

const createCar = async ({ name, available, stationId }) => {
  const car = new Car({ name, available, stationId });
  return await car.save();
};

const clearDB = async () => {
  await Car.deleteMany();
  await Station.deleteMany();
};

describe('Station', () => {
  beforeEach(clearDB);
  after(clearDB);

  describe('GET', () => {
    it('should get all station record', async () => {
      await createStation("nantes");
      await createStation("paris");

      const res = await chai.request(app).get('/stations');
      res.should.have.status(200);
      res.body.should.be.a('array').that.have.length(2);
    });

    it('should get a single station record', async () => {
      const station = await createStation("nantes");
      await createCar({ name: "mercedes", available: true, stationId: station.id });

      const res = await chai.request(app).get(`/stations/${station.id}`);
      res.should.have.status(200);
      res.body.should.be.a('object');
      res.body.name.should.equal('nantes');
      res.body.cars.should.be.a('array').that.have.length(1);
    });


    it('should not get a single station record', async () => {
      const res = await chai.request(app).get(`/stations/4`);
      res.should.have.status(404);
    });
  });

  describe('POST', () => {
    it('should create a new station', async () => {
      const res = await chai.request(app).post('/stations').send({
        name: 'nantes'
      });

      res.should.have.status(201);
      res.body.should.be.an('object');
      res.body.name.should.equal('nantes');

      const id = res.body.id;
      const station = await Station.findById(id);
      expect(station.id).not.null;
      expect(station.name).equal("nantes");
    });

    it('should not create a new station if name already exist', async () => {
      await createStation("nantes");
      const res = await chai.request(app).post('/stations').send({
        name: 'nantes'
      });

      res.should.have.status(500);
    });

    it('should not create a new station if params not filled', async () => {
      const res = await chai.request(app).post('/stations');

      res.should.have.status(400);
      res.body.should.be.an('object');
    })
  });

  describe('PUT', () => {
    it('should update the station', async () => {
      const { id } = await createStation("nantes");
      const res = await chai.request(app).put(`/stations/${id}`).send({
        name: 'paris'
      });

      res.should.have.status(200);
      res.body.name.should.equal('paris');
    });

    it('should not update the station if no params', async () => {
      const { id } = await createStation("nantes");
      const res = await chai.request(app).put(`/stations/${id}`);

      res.should.have.status(400);
    });
  });

  describe('DELETE', () => {
    it('should delete the station', async () => {
      const { id } = await createStation("nantes");
      const res = await chai.request(app).delete(`/stations/${id}`);

      res.should.have.status(200);
      const station = await Station.findById(id);
      expect(station).to.be.null;
    });

    it('should emit an error if station do not exist', async () => {
      const res = await chai.request(app).delete(`/stations/4`);

      res.should.have.status(404);
    });
  });
});
