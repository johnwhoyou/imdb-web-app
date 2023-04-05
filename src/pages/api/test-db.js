import centralNode from "../../lib/db";

// File to Test DB Connection
export default async function handler(req, res) {
  try {
    await centralNode.authenticate();
    res
      .status(200)
      .json({ message: "Connection has been established successfully." });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    res.status(500).json({ message: "Unable to connect to the database." });
  }
}
