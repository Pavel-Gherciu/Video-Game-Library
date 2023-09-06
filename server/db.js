const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "pavel2001",
  host: "localhost",
  port: 5432,
  database: "games"
})

module.exports = pool;