import { Op, Sequelize, Transaction } from "sequelize";
import { selectNode } from "../../lib/nodeSelector";
import { Movie, initModel } from "../../lib/models/Movie";

export default async function handler(req, res) {
  //Use this everytime you query the database from `Movie` model
  //       const selectedNode = await selectNode("allMovies");
  //       initModel(selectedNode);
  //this means you will use the All_Movies sschema
  //you can put before1980, from1980, allMovies depending on your needs
  const selectedNode = await selectNode("allMovies");
  initModel(selectedNode);

  if (req.method === "GET") {
    const selectedNode = await selectNode("allMovies");
    initModel(selectedNode);

    // Fetching options for genres
    if (req.query.options) {
      var genres_arr = [];

      const transaction_1 = await Movie.sequelize.transaction();

      try {
        const genres = await Movie.findAll({
          attributes: ["genre"],
          group: ["genre"],
          transaction: transaction_1,
        });

        await transaction_1.commit().then(() => {
          genres_arr = genres;
          genres_arr = genres_arr.filter((val) => {
            return val.genre != null;
          });

          res.status(201).json({ genres_arr });
        });
      } catch (error) {
        await transaction_1.rollback().then(() => {
          res.status(500).json({ message: "Error Fetching Genres" });
        });
      }
    }

    // Fetches movie data given a movie_id
    else if (req.query.movie_id && !req.query.delete) {
      const selectedNode = await selectNode("allMovies");
      initModel(selectedNode);

      var genres_arr = [];

      const transaction_1 = await Movie.sequelize.transaction();

      try {
        const find_genres = await Movie.findAll({
          attributes: ["genre"],
          group: ["genre"],
          transaction: transaction_1,
        });

        await transaction_1.commit().then(async () => {
          genres_arr = find_genres;
          genres_arr = genres_arr.filter((val) => {
            return val.genre != null;
          });

          const transaction_2 = await Movie.sequelize.transaction();

          try {
            const get_movie = await Movie.findByPk(req.query.movie_id);

            await transaction_2.commit().then(async () => {
              if (get_movie === null)
                res.status(500).json({ message: "Error movie not found." });
              else
                res.status(201).json({ movie: get_movie, genres: genres_arr });
            });
          } catch (error) {
            await transaction_2.rollback().then(() => {
              res.status(500).json({ message: "Error Fetching Movie Data" });
            });
          }
        });
      } catch (error) {
        await transaction_1.rollback().then(() => {
          res.status(500).json({ message: "Error Fetching Genres" });
        });
      }
    }

    // Delete Query
    else if (req.query.delete) {
      if (req.query.movie_id) {
        const selectedNode = await selectNode("allMovies");
        initModel(selectedNode);

        const row = await Movie.findOne({
          where: {
            id: req.query.movie_id,
          },
        });

        if (row) {
          const year = row.year;
          const transaction_1 = await Movie.sequelize.transaction();

          try {
            // Delete movie via transaction in Master DB
            const delete_Movie_1 = await Movie.destroy({
              where: {
                id: req.query.movie_id,
              },
              transaction: transaction_1,
            });

            // If no errors while deleting, commit transaction
            await transaction_1.commit().then(async () => {
              const schema = year >= 1980 ? "from1980" : "before1980";
              const newNode = await selectNode(schema);
              initModel(newNode);

              const transaction_2 = await Movie.sequelize.transaction();

              try {
                // Delete movie via transaction in Slave DB
                const delete_Movie_2 = await Movie.destroy({
                  where: {
                    id: req.query.movie_id,
                  },
                  transaction: transaction_2,
                });

                // If no errors while deleting, commit transaction
                await transaction_2.commit().then(async () => {
                  const selectedNode = await selectNode("allMovies");
                  initModel(selectedNode);

                  res
                    .status(200)
                    .json({ message: "Successfully deleted entry" });
                });
              } catch (error) {
                // Cancel delete on Slave DB if error was found
                await transaction_2.rollback().then(() => {
                  res
                    .status(500)
                    .json({ message: `Error deleting in ${schema} database` });
                });
              }
            });
          } catch (error) {
            // Cancel delete on Master DB if error was found
            await transaction_1.rollback().then(() => {
              res
                .status(500)
                .json({ message: "Error deleting in allMovies database" });
            });
          }
        } else {
          res.status(500).json({ message: "Movie Not Found" });
        }
      }
    }

    // This is used in the /search page to fetch and search movies
    else {
      const page = parseInt(req.query.page, 10) || 1;
      const limit = parseInt(req.query.limit, 10) || 10;
      const offset = (page - 1) * limit;
      const search = req.query.search || "";
      try {
        const searchOptions = search
          ? {
              where: {
                name: {
                  [Op.like]: `%${search}%`,
                },
              },
            }
          : {};
        const selectedNode = await selectNode("allMovies");
        initModel(selectedNode);
        const movies = await Movie.findAndCountAll({
          ...searchOptions,
          limit,
          offset,
          order: [["id", "ASC"]],
        });
        const totalPages = Math.ceil(movies.count / limit);
        res.status(200).json({
          data: movies.rows,
          pagination: {
            currentPage: page,
            totalPages,
            limit,
          },
        });
      } catch (error) {
        console.error("Error fetching movies:", error);
        res.status(500).json({ message: "Error fetching movies.", error });
      }
    }
  } else if (req.method === "POST") {
    try {
      // If no ID was sent, assume create new entry
      if (!req.body.id) {
        const selectedNode = await selectNode("allMovies");
        initModel(selectedNode);

        const transaction_1 = await Movie.sequelize.transaction();

        try {
          // Insert Movie via Transaction to Master DB
          const created_Movie_1 = await Movie.create(
            {
              name: req.body.name,
              year: req.body.year,
              rank: req.body.rank,
              genre: req.body.genre,
              director: req.body.director,
              actor1: req.body.actor1,
              actor2: req.body.actor2,
            },
            { transaction: transaction_1 }
          );

          // Commit Transaction if no error occurs
          await transaction_1.commit().then(async () => {
            const schema = req.body.year >= 1980 ? "from1980" : "before1980";
            const newNode = await selectNode(schema);
            initModel(newNode);

            const transaction_2 = await Movie.sequelize.transaction();

            try {
              // Insert Movie via Transaction to Slave DB
              const created_Movie_2 = await Movie.create(
                {
                  id: created_Movie_1.id,
                  name: req.body.name,
                  year: req.body.year,
                  rank: req.body.rank,
                  genre: req.body.genre,
                  director: req.body.director,
                  actor1: req.body.actor1,
                  actor2: req.body.actor2,
                },
                { transaction: transaction_2 }
              );

              // Commit Transaction if no error occurs
              await transaction_2.commit().then(async () => {
                const schema =
                  req.body.year >= 1980 ? "from1980" : "before1980";
                const newNode = await selectNode(schema);
                initModel(newNode);

                res.status(201).json({ message: "Successfully Added Entry" });
              });
            } catch (error) {
              // Cancel insert on Slave DB if error found
              await transaction_2.rollback().then(() => {
                res
                  .status(500)
                  .json({ message: "Error in adding to new node" });
              });
            }
          });
        } catch (error) {
          // Cancel insert on Master DB if error found
          await transaction_1.rollback().then(() => {
            res.status(500).json({ message: "Error in adding to new node" });
          });
        }
      }

      // If an ID was sent, assume an entry is to be updated
      else {
        const selectedNode = await selectNode("allMovies");
        initModel(selectedNode);

        const transaction_1 = await Movie.sequelize.transaction();

        try {
          // Update Movie via Transaction in Master DB
          const updated_Movie_1 = await Movie.update(
            {
              name: req.body.name,
              year: req.body.year,
              genre: req.body.genre,
              director: req.body.director,
              actor1: req.body.actor1,
              actor2: req.body.actor2,
            },
            {
              where: {
                id: req.body.id,
              },
              transaction: transaction_1,
            }
          );

          // If no errors, commit transaction
          await transaction_1.commit().then(async () => {
            const schema = req.body.year >= 1980 ? "from1980" : "before1980";
            const newNode = await selectNode(schema);
            initModel(newNode);

            const transaction_2 = await Movie.sequelize.transaction();

            try {
              // Update Movie via Transactions in Slave DB
              const updated_Movie_2 = await Movie.update(
                {
                  name: req.body.name,
                  year: req.body.year,
                  genre: req.body.genre,
                  director: req.body.director,
                  actor1: req.body.actor1,
                  actor2: req.body.actor2,
                },
                {
                  where: {
                    id: req.body.id,
                  },
                  transaction: transaction_2,
                }
              );

              // If no errors, commit transaction
              await transaction_2.commit().then(async () => {
                const selectedNode = await selectNode("allMovies");
                initModel(selectedNode);

                res.status(201).json({ message: "Successfully updated" });
              });
            } catch (error) {
              // Cancel update on Slave DB if error occurs
              await transaction_2.rollback().then(() => {
                res
                  .status(500)
                  .json({ message: `Failed to Update ${schema} database` });
              });
            }
          });
        } catch (error) {
          // Cancel update on Master DB if error occurs
          await transaction_1.rollback().then(() => {
            res
              .status(500)
              .json({ message: "Failed to update allMovies database" });
          });
        }
      }
    } catch (error) {
      console.error("Error creating movie:", error);
      res.status(500).json({ message: "Error creating movie." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
