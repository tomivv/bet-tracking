const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { client } = require("./db.js");
const { parseEmpire, parseCb } = require("./helpers");

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  client.query(
    "SELECT TO_CHAR(bet_created_at, 'dd/mm/yyyy') as bet_created_at, amount, odds, home_team, away_team, bet_team, won FROM bets;",
    (error, response) => {
      if (error) {
        res.status(500).send("error");
      } else {
        let avgOdd = 0;
        let wins = 0;
        let losses = 0;
        for (let i = 0; i < response.rowCount; i++) {
          avgOdd = avgOdd + parseFloat(response.rows[i].odds);
          if (response.rows[i].won) {
            wins += 1;
          } else {
            losses += 1;
          }
        }
        res.send({
          queryData: response.rows,
          total: response.rowCount,
          avgOdd: avgOdd / response.rowCount,
          wins: wins,
          losses: losses
        });
      }
    }
  );
});

app.post("/", (req, res) => {
  // get data from body and split betString to array
  const { site, betString } = req.body;

  let date = "";
  let game = "";
  let home = "";
  let away = "";
  let amount = "";
  let odds = "";
  let bet = "";
  let winner = "";

  if (site === "coolbet.com") {
    const parse = parseCb(betString);

    date = parse.date;
    game = parse.game;
    home = parse.home;
    away = parse.away;
    amount = parse.amount;
    odds = parse.odds;
    bet = parse.bet;
    winner = parse.winner;
  } else if (site === "csgoempire.com") {
    const parse = parseEmpire(betString);

    date = parse.date;
    game = parse.game;
    home = parse.home;
    away = parse.away;
    amount = parse.amount;
    odds = parse.odds;
    bet = parse.bet;
    winner = parse.winner;
  }
  

  client.query(
    "INSERT INTO BETS (user_id, amount, odds, home_team, away_team, bet_team, won, game, site_id, bet_created_at) VALUES ((SELECT id FROM users WHERE name=$1), $2, $3, $4, $5, $6, $7, $8, (SELECT id FROM sites WHERE name=$9), $10)",
    ["Tomi", amount, odds, home, away, bet, winner, game, site, date],
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


app.get("/sites", (req, res) => {
  client.query(
    "select name from sites order by name asc",
    (error, response) => {
      if (error) {
        res.status(500).send("error");
      } else {
        res.send(response.rows);
      }
    }
  );
});



app.listen(port, () => console.log(`running on http://localhost:${port}`));
