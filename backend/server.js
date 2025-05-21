const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;

const authRoutes = require("./routes/authRoutes");
const textRoutes = require("./routes/textRoutes");
app.use(cors());
app.use(express.json());
app.use("/api/text", textRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
