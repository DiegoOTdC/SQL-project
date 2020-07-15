const express = require("express");
const { response } = require("express");
const app = express();
const PORT = 4000;

const User = require("./models").user;

app.use(express.json());

app.post("/echo", (request, response) => {
  response.json(request.body);
});

app.post("/users", async (req, res, next) => {
  const email = req.body.email;
  try {
    if (!email || email === " ") {
      res.status(400).send("Must provide an email address");
    } else {
      const user = await User.create(req.body);
      res.json(user);
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
