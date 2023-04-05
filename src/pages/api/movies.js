import Movie from "../../lib/models/Movie";

export default async function handler(req, res) {
  if (req.method === "GET") {
    try {
      const movies = await Movie.findAll();
      res.status(200).json(movies);
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
