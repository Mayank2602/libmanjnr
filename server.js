const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");
var passport = require("passport");
var authenticate = require("./authenticate");
const { MongoClient, ServerApiVersion } = require("mongodb");

// Loading routers
const bookRouter = require("./routes/api/bookRouter");
const userRouter = require("./routes/api/userRouter");
const issueRouter = require("./routes/api/issueRouter");
const app = express();

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");

  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );

  next();
});

// Bodyparser Middleware
app.use(bodyParser.json());

// DB config
const mongoURI = require("./config/keys").mongoURI;

// Connect to mongo database

const client = new MongoClient(mongoURI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log(
      "Pinged your deployment. You successfully connected to MongoDB!"
    );
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

app.use(passport.initialize());

// Use routes
app.use("/api/books", bookRouter);
app.use("/api/users", userRouter);
app.use("/api/issues", issueRouter);

// Serve static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/public"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"));
  });
}

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started running on port ${port}`));
