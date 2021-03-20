-- WARNING THIS WILL DELETE BETS DATABASE IF IT EXISTS AND ALL YOUR DATA WILL BE GONE
DROP database bets;
CREATE database bets;
\c bets
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    email VARCHAR NOT NULL
);
CREATE TABLE sites (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR NOT NULL
);
CREATE TABLE bets (
    id BIGSERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    amount NUMERIC,
    odds NUMERIC,
    home_team VARCHAR NOT NULL,
    away_team VARCHAR NOT NULL,
    bet_team VARCHAR NOT NULL,
    game VARCHAR NOT NULL,
    site_id INT REFERENCES sites(id),
    won BOOLEAN,
    bet_created_at DATE NOT NULL DEFAULT current_date,
    updated_at DATE DEFAULT current_date
);