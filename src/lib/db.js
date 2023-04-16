import { Sequelize } from "sequelize";
import mysql2 from "mysql2";
import databaseConfig from "./dbConfig";

const poolConfig = {
  max: 5,
  min: 0,
  acquire: 30000,
  idle: 10000,
};

const configs = databaseConfig();

const createSequelizeInstance = (config) => {
  return new Sequelize(config.database, config.username, config.password, {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
    dialectModule: config.dialectModule,
    pool: poolConfig,
    dialectOptions: {
        connectTimeout: 1000,
    },
  });
};

const allMoviesNode1 = createSequelizeInstance(configs.allMoviesNode1);
const before1980Node1 = createSequelizeInstance(configs.before1980Node1);
const from1980Node1 = createSequelizeInstance(configs.from1980Node1);

const allMoviesNode2 = createSequelizeInstance(configs.allMoviesNode2);
const before1980Node2 = createSequelizeInstance(configs.before1980Node2);
const from1980Node2 = createSequelizeInstance(configs.from1980Node2);

const allMoviesNode3 = createSequelizeInstance(configs.allMoviesNode3);
const before1980Node3 = createSequelizeInstance(configs.before1980Node3);
const from1980Node3 = createSequelizeInstance(configs.from1980Node3);

export {
  allMoviesNode1,
  before1980Node1,
  from1980Node1,
  allMoviesNode2,
  before1980Node2,
  from1980Node2,
  allMoviesNode3,
  before1980Node3,
  from1980Node3,
};
