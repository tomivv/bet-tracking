const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { client } = require("./db.js");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  client.query(
    "select b.amount, b.odds, t.name home_team, a.name away_team, bo.name bet_team, b.won, g.name game_name, TO_CHAR(b.bet_created_at, 'dd/mm/yyyy') as bet_created_at from bets b inner join teams t on t.id=b.home_team_id inner join teams a on a.id=b.away_team_id inner join teams bo on bo.id=b.team_bet_on_id inner join games g on g.id=b.game_id",
    (error, response) => {
      if (error) {
        res.status(500).send("error");
      } else {
        res.send(response.rows);
      }
    }
  );
});

app.post("/", (req, res) => {
  const { game, amount, odds, home, away, bet, won, site } = req.body;

  client.query(
    "insert into bets (user_id, amount, odds, home_team_id, away_team_id, team_bet_on_id, won, game_id, site_id) values ((SELECT id from users WHERE name=$1), $2, $3, (SELECT id from teams WHERE name=$4),(SELECT id from teams WHERE name=$5),(SELECT id from teams WHERE name=$6),$7,(SELECT id from games WHERE name=$8),(SELECT id from sites WHERE name=$9))",
    ["tomi", amount, odds, home, away, bet, won, game, site],
    (error, result) => {
      if (error) {
        // code for constaint: unique
        if (error.code === "23505") {
          res.status(403).json({
            code: 403,
            msg: `duplicate`,
          });
        } else {
          res.status(400).json({
            code: 400,
            msg: `unknown error`,
          });
        }
      } else {
        res.status(201).json({
          code: 201,
          msg: "successfully create a new bet.",
        });
      }
    }
  );
});

app.get("/general/information", (req, res) => {
  client.query("select name from games", (error, games) => {
    if (error) {
      res.status(500).send("error");
    } else {
      client.query("select name from sites", (error, sites) => {
        if (error) {
          res.status(500).send("error");
        } else {
          client.query("select name from teams", (error, teams) => {
            if (error) {
              res.status(500).send("error");
            } else {
              res.status(200).json({
                teams: teams.rows,
                sites: sites.rows,
                games: games.rows,
              });
            }
          });
        }
      });
    }
  });
});

app.get("/teams", (req, res) => {
  client.query(
    "select name from teams order by name asc",
    (error, response) => {
      if (error) {
        res.status(500).send("error");
      } else {
        res.send(response.rows);
      }
    }
  );
});

app.post("/teams", (req, res) => {
  const { name } = req.body;
  client.query(
    "insert into teams (name) values ($1)",
    [name],
    (error, response) => {
      if (error) {
        // code for constaint: unique
        if (error.code === "23505") {
          res.status(403).json({
            code: 403,
            msg: `There is already team with name of "${name}"`,
          });
        } else {
          res.status(400).json({
            code: 400,
            msg: `unknown error`,
          });
        }
      } else {
        res.status(201).json({
          code: 201,
          msg: "successfully created new team.",
        });
      }
    }
  );
});

app.get("/games", (req, res) => {
  client.query(
    "select name from games order by name asc",
    (error, response) => {
      if (error) {
        res.status(500).send("error");
      } else {
        res.send(response.rows);
      }
    }
  );
});

app.post("/games", (req, res) => {
  const { name } = req.body;
  client.query(
    "insert into games (name) values ($1)",
    [name],
    (error, response) => {
      if (error) {
        // code for constaint: unique
        if (error.code === "23505") {
          res.status(403).json({
            code: 403,
            msg: `There is already game with name of "${name}"`,
          });
        } else {
          res.status(400).json({
            code: 400,
            msg: `unknown error`,
          });
        }
      } else {
        res.status(201).json({
          code: 201,
          msg: "successfully created new game.",
        });
      }
    }
  );
});

app.post("/sites", (req, res) => {
  const { name } = req.body;
  client.query(
    "insert into sites (name) values ($1)",
    [name],
    (error, response) => {
      if (error) {
        // code for constaint: unique
        if (error.code === "23505") {
          res.status(403).json({
            code: 403,
            msg: `There is already team with name of "${name}"`,
          });
        } else {
          res.status(400).json({
            code: 400,
            msg: `unknown error`,
          });
        }
      } else {
        res.status(201).json({
          code: 201,
          msg: "successfully created new site.",
        });
      }
    }
  );
});

app.listen(port, () => console.log(`running on http://localhost:${port}`));
