## Setting up server

1. run `npm install`
2. populate .env file with correct dabase information
3. run `npm start` to run server or `npm run dev` to run development server

## Setting up postgresql database

run setup_sql.sql file in postgres `psql -f ./setup_sql.sql`
this will automatically setup database with tables
just make sure if you have database named 'bets' this command drops it and makes new one and you will lose all your data


## Updates
Cleaned up code and made few updates to database/tables with backend code.