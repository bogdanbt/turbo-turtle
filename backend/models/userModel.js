// const db = require("../db/database");

// exports.createUser = ({ username, email, password }) => {
//   return new Promise((resolve, reject) => {
//     db.run(
//       `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
//       [username, email, password],
//       function (err) {
//         if (err) return reject(err);
//         resolve(this.lastID);
//       }
//     );
//   });
// };
// //for login
// exports.findUserByEmail = (email) => {
//   return new Promise((resolve, reject) => {
//     db.get(`SELECT * FROM users WHERE email = ?`, [email], (err, row) => {
//       if (err) return reject(err);
//       resolve(row);
//     });
//   });
// };
// //for page myProfile
// exports.findUserById = (id) => {
//   return new Promise((resolve, reject) => {
//     db.get(
//       `SELECT id, username, email FROM users WHERE id = ?`,
//       [id],
//       (err, row) => {
//         if (err) return reject(err);
//         resolve(row);
//       }
//     );
//   });
// };

const User = require("./User");

exports.createUser = async ({ username, email, password }) => {
  const user = new User({ username, email, password });
  await user.save();
  return user._id;
};

exports.findUserByEmail = async (email) => {
  return await User.findOne({ email });
};

exports.findUserById = async (id) => {
  return await User.findById(id).select("id username email");
};
