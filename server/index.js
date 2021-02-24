const express = require("express");
const app = express();
const PORT = 1212;
const cors = require("cors");

app.use(express.json());
app.use(cors());

const posts = require("./routes/api/posts");

app.use("/api/posts", posts);

app.listen(PORT, () => console.log("Server up ! http://localhost:" + PORT));
