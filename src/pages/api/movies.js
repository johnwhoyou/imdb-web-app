import Movie from "../../lib/models/Movie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const page = parseInt(req.query.page, 10) || 1;
    const limit = parseInt(req.query.limit, 10) || 10;
    const offset = (page - 1) * limit;

    try {
      const movies = await Movie.findAndCountAll({
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
      res.status(500).json({ message: "Error fetching movies." });
    }
  } else if (req.method === "POST") {
    try {
      const newMovie = await Movie.create(req.body);
      res.status(201).json(newMovie);
    } catch (error) {
      console.error("Error creating movie:", error);
      res.status(500).json({ message: "Error creating movie." });
    }
  } else {
    res.setHeader("Allow", ["GET", "POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}