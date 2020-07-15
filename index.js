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
  try {
    const email = req.body.email;
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

app.get("/users/:userId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId);
    if (!user) {
      res.status(404).send("User not found");
    } else {
      res.send(user);
    }
  } catch (e) {
    res.status(400).send({ message: `Error in getting user` });
  }
});

app.put("/users/:userId", (req, res) => {
  console.log("this is working");
  res.send("it really is working");
});

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
