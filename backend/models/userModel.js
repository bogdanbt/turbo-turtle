const db = require("../db/database");

exports.createUser = ({ username, email, password }) => {
  return new Promise((resolve, reject) => {
    db.run(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, password],
      function (err) {
        if (err) return reject(err);
        resolve(this.lastID);
      }
    );
  });
};
//for login
exports.findUserByEmail = (email) => {
  return new Promise((resolve, reject) => {
    db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
      if (err) return reject(err);
      resolve(row);
    });
  });
};
//for page myProfile
exports.findUserById = (id) => {
  return new Promise((resolve, reject) => {
    db.get(
      `SELECT id, username, email FROM users WHERE id = ?`,
      [id],
      (err, row) => {
        if (err) return reject(err);
        resolve(row);
      }
    );
  });
};
