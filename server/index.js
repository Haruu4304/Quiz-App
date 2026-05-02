require("dotenv").config();

const express = require("express");
const app = express();

const cors = require("cors");
const cookieParser = require("cookie-parser");

const routes = require("./routes/routes");
const database = require("./config/database");

const PORT = process.env.PORT || 4000;

// ✅ OPEN CORS (test mode)
app.use(cors());
app.options("*", cors());

// ✅ Middlewares
app.use(express.json());
app.use(cookieParser());

// ✅ DB
database.connectToDB();

// ✅ Routes
app.use("/api/v1", routes);

// ✅ Test route
app.get("/", (req, res) => {
  res.json({ message: "Server running" });
});

app.listen(PORT, () => {
  console.log(`App is running on port ${PORT}`);
});