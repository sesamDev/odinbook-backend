const { faker } = require("@faker-js/faker/locale/en");
const User = require("./models/user");
require("dotenv").config();

function createRandomUser(n) {
  return {
    first_name: "Fake",
    last_name: "User " + n,
    email: faker.internet.exampleEmail(),
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
  };
}

// Set up mongoose connection
const mongoose = require("mongoose");
// eslint-disable-next-line no-undef
const mongoDB = process.env.DB;
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));

// // // first_name: { type: String, min: 1, max: 100, required: true },
// // //   last_name: { type: String, min: 1, max: 100, required: true },
// // //   email: { type: String, min: 1, max: 100, required: true },
// // //   password: { type: String, min: 1, max: 100, required: true },
// // //   admin: { type: Boolean, default: false },
// // //   avatar: { type: String, default: defaultAvatar },
// // //   posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

Array.from({ length: 1 }).forEach((v, idx) => {
  const user = new User(createRandomUser(idx + 1));
  user.save((err) => {
    if (err) return console.log("Failed to save user to DB");
    return console.log(user + " : Saved to DB!");
  });
});

db.off;

// // console.log(createRandomUser());

// async function PopulateDatabaseWithUsers() {
//   const user = createRandomUser(1);
//   return console.log(user);
// }

// PopulateDatabaseWithUsers();
