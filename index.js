const express = require("express");
const app = express();
const PORT = 4000;

const User = require("./models").user;

app.use(express.json());

app.post("/echo", (request, response) => {
  response.json(request.body);
});

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
