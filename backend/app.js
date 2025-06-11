const userRouter = require("./routes/userRoute");
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

const app = express();
dotenv.config();
//middleware
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

// router
app.use("/api/v1", userRouter);
// server
const port = process.env.PORT;
app.listen(port, () => {
  console.log(`server berjalan di port ${port}...`);
});
