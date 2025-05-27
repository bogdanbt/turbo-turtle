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

exports.addUserResult = async (userId, result) => {
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  user.results.push({
    ...result,
    date: new Date().toISOString().split("T")[0],
  });

  user.totalTimeTyping = (user.totalTimeTyping || 0) + result.timeTyping;
  user.testsCompleted = (user.testsCompleted || 0) + 1;

  await user.save();
  return user;
};

exports.getUserStats = async (userId) => {
  return await User.findById(userId).select(
    "username email results totalTimeTyping testsCompleted"
  );
};
