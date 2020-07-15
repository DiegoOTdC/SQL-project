const express = require("express");
const { response } = require("express");
const app = express();
const PORT = process.env.PORT || 4000;
const User = require("./models").user;
const TodoList = require("./models").todoList;
const cors = require("cors");
app.use(cors());

app.use(express.json());

//test your setup
app.post("/echo", (request, response) => {
  response.json(request.body);
});

//create a new user resource (adds a row to the user table)
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

//find the specific user (by userId param)
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

//update an entire user
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

//get all todolists from the specific user
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

//create a new TodoList for this particular user
app.post("/users/:userId/lists", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, { include: [TodoList] });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      const list = await TodoList.create({ userId, ...req.body });
      res.json(list);
    }
  } catch (e) {
    res.status(400).send({ message: "Error posting a new todo list" });
  }
});

//update an existing TodoList to something else... patch if better if it's updating part of it... put if you update the entire thing.
app.put("/users/:userId/lists/:listId", async (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const listId = parseInt(req.params.listId);

    const userByPk = await User.findByPk(userId, { include: [TodoList] });
    const { todoLists } = userByPk;
    const listToUpdate = todoLists.find((list) => {
      if (list.id === listId) {
        return true;
      } else {
        return false;
      }
    });

    if (!listToUpdate) {
      res.status(404).send(`User ${userId} does not have list ${listId}`);
    } else {
      const updatedList = await listToUpdate.update(req.body);
      res.send(updatedList);
    }
  } catch (e) {
    res.status(400).send({ message: "Error updating the todo list" });
  }
});

// how they did above code in the reader:
//app.put("/users/:userId/lists/:listId", async (req, res, next) => {
//    try {
//      const listId = parseInt(req.params.listId);
//      const toUpdate = await TodoList.findByPk(listId);
//      if (!toUpdate) {
//        res.status(404).send("List not found");
//      } else {
//        const updated = await toUpdate.update(req.body);
//        res.json(updated);
//      }
//    } catch (e) {
//      next(e);
//    }
//  });

////read a single list
//app.get("/users/:userId/lists/:listId", async (req, res) => {
//  try {
//    const userId = parseInt(req.params.userId);
//    const listId = parseInt(req.params.listId);
//
//    const userByPk = await User.findByPk(userId, { include: [TodoList] });
//    const { todoLists } = userByPk;
//
//    const list = todoLists.find((list) => {
//      if (list.id === listId) {
//        return true;
//      } else {
//        return false;
//      }
//    });
//
//    if (!list) {
//      res.status(404).send(`List not found`);
//    } else {
//      res.send(list);
//    }
//  } catch (e) {
//    res.status(400).send({ message: "Error updating the todo list" });
//  }
//});
//
app.get("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const list = await TodoList.findByPk(listId);
    if (!list) {
      res.status(404).send("list not found");
    } else {
      res.json(list);
    }
  } catch (e) {
    next(e);
  }
});

//delete specific list by id (using params)

app.delete("/users/:userId/lists/:listId", async (req, res, next) => {
  try {
    const listId = parseInt(req.params.listId);
    const toDelete = await TodoList.findByPk(listId);
    if (!toDelete) {
      res.status(404).send("list not found");
    } else {
      const deleted = await toDelete.destroy();
      res.json(deleted);
    }
  } catch (e) {
    next(e);
  }
});

// delete all user's lists
app.delete("/users/:userId/lists", async (req, res, next) => {
  try {
    const userId = parseInt(req.params.userId);
    const user = await User.findByPk(userId, { include: [TodoList] });
    if (!user) {
      res.status(404).send("user not found");
    } else {
      user.todoLists.forEach(async (list) => await list.destroy());
      res.status(204).send();
    }
  } catch (e) {
    next(e);
  }
});

app.listen(PORT, () => {
  console.log(`Listening on: ${PORT}`);
});
