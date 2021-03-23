function monthsToNumber(month) {
  const months = {
    Jan: "1",
    Feb: "2",
    Mar: "3",
    Apr: "4",
    May: "5",
    Jun: "6",
    Jul: "7",
    Aug: "8",
    Sep: "9",
    Oct: "10",
    Nov: "11",
    Dec: "12",
  };
  return months[month];
}

function parseCb(input) {
  // split input
  const split = input.split(",");
  // assing variables
  let date = split[6];
  const game = split[0];
  const home = split[1];
  const away = split[2];
  const amount = split[5];
  const odds = split[4];
  const bet = split[3];
  let winner = split[7];

  // changing date to psql format (finnish version of site)
  const months = {
    tammi: "1",
    helmi: "2",
    maalis: "3",
    huhti: "4",
    touko: "5",
    kesa: "6",
    heina: "7",
    elo: "8",
    syys: "9",
    loka: "10",
    marras: "11",
    joulu: "12",
  };

  date = `${date.split(" ")[2]}-${months[date.split(" ")[1]]}-${date.split(" ")[0]}`;

  // winner check (finnish version)
  if (winner === "Voitto") {
    winner = true;
  } else {
    winner = false
  }

  return {date,game,home,away,amount,odds,bet,winner};
}

function parseEmpire(input) {

  const split = input.split("\t");

  // assing variables
  const date = split[1];
  const game = split[2];
  const home = split[3].split("vs.")[0];
  const away = split[3].split("vs.")[1];
  const amount = split[6];
  const odds = split[7];
  const bet = split[8];
  const winner = split[9];

  // change date to psql format
  psqlDate = "";
  if (date.split(" ").length > 4) {
    psqlDate = `${date.split(" ")[3]}-${monthsToNumber(date.split(" ")[2].replace(",", ""))}-${
      date.split(" ")[1]
    }`;
  } else {
    psqlDate = `${new Date().getFullYear()}-${monthsToNumber(date.split(" ")[2])}-${
      date.split(" ")[1]
    }`;
  }
  // checking if bet is won or lost
  let won = false;
  if (bet === winner) {
    won = true;
  }

  return {date,game,home,away,amount,odds,bet,winner};
}

module.exports = { parseCb, parseEmpire };
