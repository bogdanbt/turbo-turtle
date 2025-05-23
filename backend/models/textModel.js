// const db = require("../db/database");

// exports.getRandomText = (language, difficulty) => {
//   const sql = `
//     SELECT * FROM texts
//     WHERE language = ? AND difficulty = ?
//     ORDER BY RANDOM() LIMIT 1
//   `;
//   return new Promise((resolve, reject) => {
//     db.get(sql, [language, difficulty], (err, row) => {
//       if (err) return reject(err);
//       resolve(row);
//     });
//   });
// };

// exports.getTextById = (id) => {
//   return new Promise((resolve, reject) => {
//     db.get(`SELECT * FROM texts WHERE id = ?`, [id], (err, row) => {
//       if (err) return reject(err);
//       resolve(row);
//     });
//   });
// };

// exports.insertText = ({
//   content,
//   language,
//   difficulty,
//   recommended_time,
//   title,
// }) => {
//   const sql = `
//     INSERT INTO texts (content, language, difficulty, recommended_time, title)
//     VALUES (?, ?, ?, ?, ?)
//   `;
//   const values = [content, language, difficulty, recommended_time, title];
//   return new Promise((resolve, reject) => {
//     db.run(sql, values, function (err) {
//       if (err) return reject(err);
//       resolve(this.lastID);
//     });
//   });
// };

// exports.deleteTextById = (id) => {
//   return new Promise((resolve, reject) => {
//     db.run(`DELETE FROM texts WHERE id = ?`, [id], function (err) {
//       if (err) return reject(err);
//       resolve(this.changes > 0);
//     });
//   });
// };

const Text = require("./Text");

exports.getRandomText = async (language, difficulty) => {
  return await Text.aggregate([
    { $match: { language, difficulty } },
    { $sample: { size: 1 } },
  ]).then((res) => res[0]);
};

exports.getTextById = async (id) => {
  return await Text.findById(id);
};

exports.insertText = async ({
  content,
  language,
  difficulty,
  recommended_time,
  title,
}) => {
  const text = new Text({
    content,
    language,
    difficulty,
    recommended_time,
    title,
  });
  await text.save();
  return text._id;
};

exports.deleteTextById = async (id) => {
  const result = await Text.deleteOne({ _id: id });
  return result.deletedCount > 0;
};
