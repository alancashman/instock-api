
require("dotenv").config();

module.exports = {
  client: "mysql2",
  connection: {
    database: process.env.DB_LOCAL_DBNAME,
    user: process.env.DB_LOCAL_USER,
    password: process.env.DB_LOCAL_PASSWORD,
  },
};
