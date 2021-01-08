import React, { useEffect, useState } from "react";
import { apiUri }  from "../contexts/apiUri";

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
          {betdata.map((item, index) => (
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
    );
  }
}
