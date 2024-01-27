const express = require("express");
const { PORT, mongodbURL } = require("./config");
const app = express();
const Book = require("./models/books");
const mongoose = require("mongoose");
const cors = require("cors");

app.use(cors()); //default cors - allows all origins , dont use.

// custom origins - refer Express js for more detail

// app.use(
//   cors({
//     origin: "http://localhost:8000",
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     allowedHeaders: ["Content-Type"],
//     optionsSuccessStatus: 200,
//   })
// );

app.use(express.json());
// we can use app.get ,post,put,delete but it is not much efficient so , we use express router() . in separate folder

// index page
app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/books", require("./router/route"));

main().catch((err) => console.log(err.message));

async function main() {
  await mongoose.connect(mongodbURL);
  console.log("dataBase connection succeed");
  app.listen(PORT, () => console.log("Server is running on PORT: ", PORT));
}
