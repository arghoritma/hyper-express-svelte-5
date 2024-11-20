import type { Knex } from "knex";
import knex from "./app/services/DB";

// Update with your config settings.

const config: { [key: string]: Knex.Config } = {
  development: {
    client: "better-sqlite3",
    connection: {
      filename: "./db/dev.sqlite3"
    },
    useNullAsDefault : true
  },

  production: {
    client: "better-sqlite3",
    connection: {
      filename: "./db/production.sqlite3"
    },
    useNullAsDefault : true
  },
 
 

};

export default config