## Setting up server

1. run `npm install`
2. populate .env file with correct dabase information
3. run `npm start` to run server or `npm run dev` to run development server

## Setting up postgresql database

create users table

```
create table users (
  id serial primary key,
  name varchar(255),
  email varchar(255),
  isAdmin boolean
);
```

create teams table

```
create table teams (
  id serial primary key,
  name varchar(255)
);
```

create games table

```
create table games (
  id serial primary key,
  name varchar(255)
);
```

create sites table

```
create table sites (
  id serial primary key,
  name varchar(255)
);
```

create bets table

```
create table bets (
  id serial primary key,
  user_id int references users(id),
  amount numeric,
  odds numeric,
  home_team_id int references teams(id),
  away_team_id int references teams(id),
  team_bet_on_id int references teams(id),
  game_id int references games(id),
  site_id int references sites(id),
  won boolean,
  bet_created_at date not null default current_date,
  updated_at date
);
```
