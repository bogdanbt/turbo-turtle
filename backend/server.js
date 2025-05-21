const express = require("express");
const app = express();
const PORT = 3000;

const textRoutes = require("./routes/textRoutes");

app.use(express.json());
app.use("/api/text", textRoutes);

app.listen(PORT, () => {
  console.log(`Server is running at http://localhost:${PORT}`);
});
