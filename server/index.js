const express = require("express");
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const posts = require("./routes/api/posts");

app.use("/api/posts", posts);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(__dirname + "/public/"));

  app.get(/.*/, (req, res) => res.sendFile(__dirname + "/public/index.html"));
}

const PORT = process.env.PORT || 1212;
app.listen(PORT, () => console.log("Server up ! http://localhost:" + PORT));
