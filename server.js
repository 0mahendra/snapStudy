const express = require("express");
const cors = require("cors");
const connectDB = require("./config/ds");
const dotenv = require("dotenv");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());


app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/notes", require("./routes/noteRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
