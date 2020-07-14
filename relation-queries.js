const { user, todoItem, todoList } = require("./models");

// 1 get todoLists with user data
async function listsWithUsers() {
  const lists = await todoList.findAll({
    include: [user],
  });
  return lists.map((list) => list.get({ plain: true }));
}

//listsWithUsers().then((lists) => console.log("withUsers", lists));

// 2 get todoLists with userNames only.

async function listsWithUserNames() {
  const lists = await todoList.findAll({
    include: { model: user, attributes: ["name"] },
  });
  return lists.map((list) => list.get({ plain: true }));
}

//listsWithUserNames().then((lists) => console.log("withUserNames", lists));

// 3 get users with their lists

async function getUsersWithList() {
  const allUsers = await user.findAll({
    include: { model: todoList, attributes: ["name"] },
  });
  return allUsers.map((user) => user.get({ plain: true }));
}

getUsersWithList().then((users) => console.log("usersWithListNames", users)); //gives me an array with [Object] instead of an array with the name.. that is what I was expecting..

// 4 Get one user by id with his lists

async function getUserByIdWithLists(id) {
  const userById = await user.findByPk(id, {
    include: { model: todoList, attributes: ["name"] },
  });
  return userById.get({ plain: true });
}

//getUserByIdWithLists(1).then((users) => console.log("byId", users));

// 5 get important TodoItems with the name of the list they belong to

async function importantItems() {
  const items = await todoItem.findAll({
    where: { important: true },
    include: { model: todoList, attributes: ["name"] },
  });
  return items.map((item) => item.get({ plain: true }));
}

//importantItems().then((users) => console.log("important", users));

// 6 get one user by id with his lists, which also contain their belonging TodoItem's task attrbute.

async function userIdListItemTask(id) {
  const users = await user.findByPk(id, {
    include: [
      {
        model: todoList,
        attributes: ["name"],
        include: { model: todoItem, attributes: ["task"] },
      },
    ],
  });

  return users.get({ plain: true });
}

userIdListItemTask(2).then((user) => console.log("user with tasks", user)); // gives [array] instead of the items in todoItems.
