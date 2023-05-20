require("dotenv").config();
const express = require("express");
const { MongoClient, ServerApiVersion } = require("mongodb");
const authRouter = require("./routes/authRoute");
const postRouter = require("./routes/postRoute");
const { default: mongoose } = require("mongoose");
const cors = require("cors");

const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@learning-manager.swd6ctg.mongodb.net/?retryWrites=true&w=majority`;

const connectDB = async () => {
  try {
    await mongoose.connect(uri, {
      dbName: "my_db",
    });
    console.log("Mongo DB connected");
  } catch (e) {
    console.log(e);
    process.exit(1);
  }
};

connectDB();
const PORT = 3456;
const app = express();
app.use(express.json());
app.use(cors())
app.get("/", (req, res) => res.send("Hello World"));
app.use("/api/auth", authRouter);
app.use("/api/posts", postRouter);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));