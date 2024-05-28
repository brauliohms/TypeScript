module.exports = {
  client: "sqlite3", // or 'better-sqlite3'
  connection: {
    filename: "/home/braulio/tmp/TypeScript/arquiteturadb.sqlite3",
    flags: ["OPEN_URI", "OPEN_SHAREDCACHE"],
  },
  useNullAsDefault: true,
  migrations: {
    tableName: "knex_migrations",
  },
};
