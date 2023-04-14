import { allMoviesNode1, allMoviesNode2, allMoviesNode3 } from "../../lib/db";

// File to Test DB Connections
export default async function handler(req, res) {
  let node1Status = "";
  let node2Status = "";
  let node3Status = "";

  try {
    await allMoviesNode1.authenticate();
    node1Status = "Database 1 connection has been established successfully.";
    console.log("Database 1 connection has been established successfully.");
  } catch (error) {
    node1Status = "Database 1 connection has been established successfully." + error;
    console.error("Unable to connect to Database 1:", error);
  }

  try {
    await allMoviesNode2.authenticate();
    node2Status = "Database 2 connection has been established successfully.";
    console.log("Database 2 connection has been established successfully.");
  } catch (error) {
    node2Status = "Database 2 connection has been established successfully." + error;
    console.error("Unable to connect to Database 2:", error);
  }

  try {
    await allMoviesNode3.authenticate();
    node3Status = "Database 3 connection has been established successfully.";
    console.log("Database 3 connection has been established successfully.");
  } catch (error) {
    node3Status = "Database 3 connection has been established successfully." + error;
    console.error("Unable to connect to Database 3:", error);
  }

  // Send a response with the results of the connection tests
  const connectionStatuses = [
    { database: 1, connected: node1Status },
    { database: 2, connected: node2Status },
    { database: 3, connected: node3Status },
  ];

  res
    .status(200)
    .json({ message: "Database connection test results.", connectionStatuses });
}
