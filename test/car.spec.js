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

describe('Car', () => {
  beforeEach(clearDB);
  after(clearDB);

  describe('GET', () => {

  });

  describe('POST', () => {

  });

  describe('PUT', () => {

  });

  describe('DELETE', () => {

  });
});
