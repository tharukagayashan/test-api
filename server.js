const express = require("express");
const cors = require("cors");

const app = express();

const origins = ["*"]

app.use(cors(origins));
app.use(express.json());

const port = 80;

const doctorRoutes = require("./routes/Doctors");

app.use("/doctors", doctorRoutes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});