const express = require("express");
const { response } = require("express");
const app = express();
const PORT = 4000;

const User = require("./models").user;
const TodoList = require("./models").todoList;

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

app.put("/users/:userId", async (req, res) => {
  const userId = parseInt(req.params.userId);
  const userToUpdate = await User.findByPk(userId);
  try {
    if (!userToUpdate) {
      res.status(404).send("User not found");
    } else {
      const updatedUser = await userToUpdate.update(req.body);
      res.json(updatedUser);
    }
  } catch (e) {
    res.status(400).send({ message: "Error in updating user" });
  }
});

app.get("/users/:userId/lists", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, { include: [TodoList] });
    if (user) {
      res.send(user.todoLists);
    } else {
      res.status(404).send("user not found");
    }
  } catch (e) {
    res.status(400).send({ message: "Error in getting todo lists" });
  }
});

app.post("/todolists", async (req, res) => {
  try {
    const name = req.body.name;
    if (!name || name === " ") {
      res.status(400).send("Must provide a name for the list");
    } else if (!userId) {
      const list = await TodoList.create(req.body);
      res.json(list);
    }
  } catch (e) {
    res.status(404).send({ message: "Error posting a new todo list" });
  }
});

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
