const User = require("./models").user;
const TodoItem = require("./models").todoItem;

// search for all users and log them
async function searchAllUsers() {
  try {
    const allUsers = await User.findAll();
    console.log(allUsers);
  } catch (error) {
    console.log(error);
  }
}

//searchAllUsers();

//search for all todoitems and logs them using plain:true (so get less info)

async function searchAllTodoItems() {
  try {
    const allTodoItems = await TodoItem.findAll();
    console.log(allTodoItems);
    console.log(
      "plain:",
      allTodoItems.map((item) => item.get({ plain: true }))
    );
  } catch (error) {
    console.log(error);
  }
}

//searchAllTodoItems();

async function usersByPk(id) {
  try {
    const user = await User.findByPk(id);
    console.log(user.get({ plain: true }));
  } catch (error) {
    console.log(error);
  }
}

usersByPk(1);

async function createNewUser() {
  try {
    const user1 = await User.create({
      name: "George Pio",
      email: "george@email.com",
      phone: 7654321,
    });
    return [user1].map((item) => item.get({ plain: true }));
  } catch (error) {
    console.log(error);
  }
}

//createNewUser().then((user) => console.log(user));

async function importantTodoItems() {
  try {
    const importantItems = await TodoItem.findAll({
      where: { important: true },
    });
    console.log(importantItems.map((item) => item.get({ plain: true })));
  } catch (error) {
    console.log(error);
  }
}

//importantTodoItems();
