import { Sequelize } from "sequelize";

const allMoviesNode1 = new Sequelize("All_Movies", process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 39048,
    dialect: "mysql",
});
const before1980Node1 = new Sequelize("Before_1980", process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 39048,
    dialect: "mysql",
});
const from1980Node1 = new Sequelize("From_1980", process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 39048,
    dialect: "mysql",
});

const allMoviesNode2 = new Sequelize("All_Movies", process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 39049,
    dialect: "mysql",
});
const before1980Node2 = new Sequelize("Before_1980", process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 39049,
    dialect: "mysql",
});
const from1980Node2 = new Sequelize("From_1980", process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 39049,
    dialect: "mysql",
});

const allMoviesNode3 = new Sequelize("All_Movies", process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 39050,
    dialect: "mysql",
});
const before1980Node3 = new Sequelize("Before_1980", process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 39050,
    dialect: "mysql",
});
const from1980Node3 = new Sequelize("From_1980", process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    port: 39050,
    dialect: "mysql",
});

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
