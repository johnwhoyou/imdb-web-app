import { Op } from "sequelize";
import Movie from "../../lib/models/Movie";

export default async function handler(req, res) {
  if (req.method === "GET") {

    // Fetching options for genres
    if(req.query.options){

      var genres_arr = []

      Movie.findAll({
        attributes: ['genre'],
        group: ['genre']
      }).then((genres) => {
        genres = genres.filter((val) => {
          return val.genre != null
        })
        genres_arr = genres

        res.status(201).json({ genres_arr })

      }).catch((err) => {
        res.status(500).json({message: "Error Fetching Genres"})
      })
    }
    else{
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
      if(!req.body.id){

        // Insert new entry
        Movie.max('id').then((maxID) => {
          let id = maxID + 1

          Movie.create({
            id: id,
            name: req.body.name,
            year: req.body.year,
            rank: req.body.rank,
            genre: req.body.genre,
            director: req.body.director,
            actor1: req.body.actor1,
            actor2: req.body.actor2
          })
          .then((created) => {

              // if(req.body.year >= 1980){
              //   res.status(201).json(newMovie)
              //   // Movie Create in node 2
              // }

              // else{
              //   res.status(201).json(newMovie)
              //   // Create Movie for node 3
              // }

            res.status(201).json(created)
          })
          .catch((error) => {
            res.status(500).json({message: error.message})
          })
        }).catch((error) => {
          res.status(500).json({message: error.message})
        })
      }

      // If an id was sent, assume an entry is to be updated
      else{
        
      }

    } catch (error) {
      console.log(error)
      console.error("Error creating movie:", error);
      res.status(500).json({ message: "Error creating movie." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}