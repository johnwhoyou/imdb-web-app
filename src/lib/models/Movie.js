const { DataTypes } = require("sequelize");
import centralNode from "../db";

const Movie = centralNode.define("Movie", {
    // Model attributes are defined here
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    year: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    genre: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    director: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    actor1: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    actor2: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, {
    // Other model options go here
    tableName: "movies",
    timestamps: false,
});

// `centralNode.define` also returns the model
console.log(Movie === centralNode.models.Movie); // true

export default Movie;
