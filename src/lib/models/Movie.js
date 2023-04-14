import { DataTypes, Model } from "sequelize";

class Movie extends Model {}

const initModel = (sequelizeInstance) => {
  Movie.init(
    {
      id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4,
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
        allowNull: true,
      },
    },
    {
      sequelize: sequelizeInstance,
      modelName: "Movie",
      tableName: "movies",
      timestamps: false,
    }
  );
};

export { Movie, initModel };