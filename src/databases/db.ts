import pg from "pg";
const { Pool } = pg;

const db  = new Pool ({
   user: process.env.POSTGRES_DB_USER,
   host: process.env.POSTGRES_DB_HOST,
   database: process.env.POSTGRES_DB_NAME,
   password: process.env.POSTGRES_DB_PASSWORD,
   port: +process.env.POSTGRES_DB_PORT!,
})

export default db;