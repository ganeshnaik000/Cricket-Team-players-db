const express = require("express");
const path = require("path");

const { open } = require("sqlite");
const sqlite3 = require("sqlite3");

const app = express();
app.use(express.json());

const dbPath = path.join(__dirname, "cricketTeam.db");
let db = null;

const initilizerDBServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(3000, () => {
      console.log("Server is runnig at http://localhost/3000");
    });
  } catch (e) {
    console.log(`DB Error: ${e.message}`);
    process.exit(1);
  }
};

initilizerDBServer();

// DISPLAY NUMBER OF TABLES
app.get("/", async (request, response) => {
  const getBookQuery = `SELECT * FROM
    cricket_team 
    ORDER BY player_id;`;
  const getArrayOfTeams = await db.all(getBookQuery);
  response.send(getArrayOfTeams);
});

//GET A ONLY ONE PLAYER Details
app.get("/players/:playersId/", async (request, response) => {
  const { playersId } = request.params;
  const getPlayerDetails = `
    SELECT * FROM 
    cricket_team
    WHERE 
    player_id = ${playersId};`;
  const playerDetails = await db.get(getPlayerDetails);
  request.send(playerDetails);
});
