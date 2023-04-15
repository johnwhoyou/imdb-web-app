import { Op, Sequelize, Transaction } from "sequelize";
import { selectNode } from "../../lib/nodeSelector";
import { Movie, initModel } from "../../lib/models/Movie";

export default async function handler(req, res) {
  //Use this everytime you query the database from `Movie` model
  //       const selectedNode = await selectNode("allMovies");
  //       initModel(selectedNode);
  //this means you will use the All_Movies sschema
  //you can put before1980, from1980, allMovies depending on your needs

  if (req.method === "GET") {
    const selectedNode = await selectNode("allMovies");
    initModel(selectedNode);

    // Fetching options for genres
    if (req.query.options) {
      var genres_arr = [];

      Movie.findAll({
        attributes: ["genre"],
        group: ["genre"],
      })
        .then((genres) => {
          genres = genres.filter((val) => {
            return val.genre != null;
          });
          genres_arr = genres;

          res.status(201).json({ genres_arr });
        })
        .catch((err) => {
          res.status(500).json({ message: "Error Fetching Genres" });
        });
    }

    // Fetches movie data given a movie_id
    else if (req.query.movie_id && !req.query.delete) {
      const selectedNode = await selectNode("allMovies");
      initModel(selectedNode);
      
      var genres_arr = [];
      
      Movie.findAll({
        attributes: ["genre"],
        group: ["genre"],
      })
      .then((genres) => {
        genres = genres.filter((val) => {
          return val.genre != null
        })

        genres_arr = genres;

        Movie.findByPk(req.query.movie_id)
        .then((movie) => {
            if (movie === null)
              res.status(500).json({ message: "Error movie not found." })
            else {
              res.status(201).json({ movie: movie, genres: genres_arr })
            }
          })
          .catch(() => {
            res.status(500).json({ message: "Error Fetching Movie Data" })
          });
      })
      .catch(() => {
        res.status(500).json({ message: "Error Fetching Genres" })
      })
    } 

    // Delete Query
    else if (req.query.delete) {
      if (req.query.movie_id) {

        const selectedNode = await selectNode("allMovies")
        initModel(selectedNode)

        const row = await Movie.findOne({
          where: {
            id: req.query.movie_id,
          },
        });

        if (row) {

          const year = row.year

          Movie.destroy({
            where: {
              id: req.query.movie_id,
            },
          })
          .then(async () => {

            const schema = year >= 1980 ? "from1980" : "before1980"
            const newNode = await selectNode(schema)
            initModel(newNode)

            Movie.destroy({
              where: {
                id: req.query.movie_id,
              },
            })
            .then(async () => {
              const selectedNode = await selectNode("allMovies")
              initModel(selectedNode)

              res.status(200).json({message: "Successfully deleted entry"});
            })
            .catch(() => {
              res.status(500).json({ message: `Error deleting entry in ${schema} database` });
            })

          })
          .catch((error) => {
            res.status(500).json({ message: "Error deleting entry" });
          });
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
      // If no id is sent, create new entry
      if (!req.body.id) {

        const selectedNode = await selectNode("allMovies")
        initModel(selectedNode)

        const transaction_1 = await Movie.sequelize.transaction()

        try {
          
          // Insert Movie via Transaction to Master DB
          const created_Movie_1 = await Movie.create({
            name: req.body.name,
            year: req.body.year,
            rank: req.body.rank,
            genre: req.body.genre,
            director: req.body.director,
            actor1: req.body.actor1,
            actor2: req.body.actor2,
          }, {transaction: transaction_1})

          // Commit Transaction if no error occurs
          await transaction_1.commit()
          .then(async () => {

            const schema = req.body.year >= 1980 ? "from1980" : "before1980"
            const newNode = await selectNode(schema)
            initModel(newNode)

            const transaction_2 = await Movie.sequelize.transaction()

            try {

              // Insert Movie via Transaction to Slave DB
              const created_Movie_2 = await Movie.create({
                id: created_Movie_1.id,
                name: req.body.name,
                year: req.body.year,
                rank: req.body.rank,
                genre: req.body.genre,
                director: req.body.director,
                actor1: req.body.actor1,
                actor2: req.body.actor2,
              }, {transaction: transaction_2})

              // Commit Transaction if no error occurs
              await transaction_2.commit()
              .then(async () => {

                const schema = req.body.year >= 1980 ? "from1980" : "before1980"
                const newNode = await selectNode(schema)
                initModel(newNode)

                res.status(201).json({ message: "Successfully Added Entry" })

              })

            } catch (error) {
              
              // Cancel Commit if error found
              await transaction_2.rollback().then(() => {
                res.status(500).json({ message: "Error in adding to new node" });
              })

            }

          })

        } catch (error) {

          // Cancel Commit if error found
          await transaction_1.rollback().then(() => {
            res.status(500).json({ message: "Error in adding to new node" });
          })        

        }

        // Insert new entry
        // Movie.create({
        //   name: req.body.name,
        //   year: req.body.year,
        //   rank: req.body.rank,
        //   genre: req.body.genre,
        //   director: req.body.director,
        //   actor1: req.body.actor1,
        //   actor2: req.body.actor2,
        // })
        // .then(async (created) => {
        //   const schema = req.body.year >= 1980 ? "from1980" : "before1980"
        //   const newNode = await selectNode(schema)
        //   initModel(newNode)

        //   Movie.create({
        //     id: created.id,
        //     name: req.body.name,
        //     year: req.body.year,
        //     rank: req.body.rank,
        //     genre: req.body.genre,
        //     director: req.body.director,
        //     actor1: req.body.actor1,
        //     actor2: req.body.actor2,
        //   })
        //   .then(async () => {

        //     const masterNode = await selectNode("allMovies")
        //     initModel(masterNode)

        //     res.status(201).json({message: "Successfully Added"})
        //   })
        //   .catch((error) => {
        //     res.status(500).json({ message: "Error in adding to new node" });
        //   })

        // })
        // .catch((error) => {
        //   res.status(500).json({ message: error.message });
        // })
      }

      // If an id was sent, assume an entry is to be updated
      else {

        const selectedNode = await selectNode("allMovies")
        initModel(selectedNode)

        Movie.update(
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
          }
        )
        .then(async (updated) => {

          const schema = req.body.year >= 1980 ? "from1980" : "before1980"
          const newNode = await selectNode(schema)
          initModel(newNode)

          Movie.update(
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
                id: req.body.id
              }
            }
          )
          .then(async () => {
            const masterNode = await selectNode("allMovies")
            initModel(masterNode)

            res.status(201).json({ message: "Successfully updated" });
          })
          .catch(() => {
            res.status(500).json({ message: `Failed to Update ${schema} database`})
          })

        })
        .catch(() => {
          res.status(500).json({ message: "Failed to update allMovies database" })
        })

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