const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./typing_game.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS texts (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      content TEXT NOT NULL,
      language TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      recommended_time INTEGER,
      title TEXT
    )
  `);
});

module.exports = db;
