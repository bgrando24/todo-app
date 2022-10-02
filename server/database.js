const Pool = require('pg').Pool;
const pool = new Pool({
    user: "db_admin",
    password: "adminpassword24",
    host: "portfolio-db.cpmngpjcp6jf.us-west-2.rds.amazonaws.com",
    port: 5432,
    database: "initial_portfolio_db"
});

module.exports = pool;