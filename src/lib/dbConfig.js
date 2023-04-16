import mysql2 from "mysql2";

const databaseConfig = () => {
  return {
    // NODE 1
    allMoviesNode1: {
      database: "All_Movies",
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: 39048,
      dialect: "mysql",
      dialectModule: mysql2,
    },
    before1980Node1: {
      database: "Before_1980",
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: 39048,
      dialect: "mysql",
      dialectModule: mysql2,
    },
    from1980Node1: {
      database: "From_1980",
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: 39048,
      dialect: "mysql",
      dialectModule: mysql2,
    },
    // NODE 2
    allMoviesNode2: {
      database: "All_Movies",
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: 39049,
      dialect: "mysql",
      dialectModule: mysql2,
    },
    before1980Node2: {
      database: "Before_1980",
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: 39049,
      dialect: "mysql",
      dialectModule: mysql2,
    },
    from1980Node2: {
      database: "From_1980",
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: 39049,
      dialect: "mysql",
      dialectModule: mysql2,
    },
    // NODE 3
    allMoviesNode3: {
      database: "All_Movies",
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: 39050,
      dialect: "mysql",
      dialectModule: mysql2,
    },
    before1980Node3: {
      database: "Before_1980",
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: 39050,
      dialect: "mysql",
      dialectModule: mysql2,
    },
    from1980Node3: {
      database: "From_1980",
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      host: process.env.DB_HOST,
      port: 39050,
      dialect: "mysql",
      dialectModule: mysql2,
    },
  };
};

export default databaseConfig;
