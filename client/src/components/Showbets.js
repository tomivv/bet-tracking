import React, { useEffect, useState } from "react";
const apiUri = "http://localhost:3001";

export default function Showbets() {
  const [betdata, setBetdata] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`${apiUri}`)
      .then((res) => res.json())
      .then((result) => {
        setBetdata(result);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <h1 className="title">Loading...</h1>;
  }
  if (!loading) {
    return (
      <div>
        <div className="tile is-ancestor">
        <div className="tile is-parent">
            <article className="tile is-child notification is-success has-text-centered">
              <p className="title">Total bets</p>
              <p className="subtitle">{betdata.total}</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-success has-text-centered">
              <p className="title">Average odds</p>
              <p className="subtitle">{betdata.avgOdd.toFixed(2)}</p>
            </article>
          </div>
          <div className="tile is-parent">
            <article className="tile is-child notification is-success has-text-centered">
              <p className="title">Win ratio</p>
              <p className="subtitle">{((betdata.wins/betdata.total)*100).toFixed(2)}%<br />({betdata.wins}/{betdata.losses})</p>
            </article>
          </div>
        </div>
        <table className="table is-narrow is-fullwidth is-hoverable is-striped">
        <thead>
          <tr>
            <th>Date</th>
            <th>Amount</th>
            <th>Odds</th>
            <th>Home team</th>
            <th>Away team</th>
            <th>Bet team</th>
            <th>Won</th>
          </tr>
        </thead>
        <tbody>
          {betdata.queryData.map((item, index) => (
            <tr key={index}>
              <th>{item.bet_created_at}</th>
              <th>{item.amount}</th>
              <th>{item.odds}</th>
              <th>{item.home_team}</th>
              <th>{item.away_team}</th>
              <th>{item.bet_team}</th>
              <th>{item.won ? "Won" : "Lost"}</th>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
      
    );
  }
}
