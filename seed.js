const { faker } = require("@faker-js/faker/locale/en");
const User = require("./models/user");
require("dotenv").config();

const names = [
  "Ervin Darnell",
  "Ali Hadley",
  "Tanner Duong",
  "Alexzander Rucker",
  "Carson Bruce",
  "Tayla Willson",
  "Elias Whiting",
  "Tracy Zapata",
  "Montana Lennon",
  "Bayleigh Quinones",
  "Ximena Luu",
  "Jaycie Connor",
  "Armando Hatcher",
  "Santana Lackey",
  "Natali Sizemore",
  "Clark Small",
  "Haden Malley",
  "Juana Bagwell",
  "Elliott Bui",
  "Daquan Chapin",
  "Serena Barlow",
  "Esperanza Dickerson",
  "Jana Akers",
  "Deontae Christian",
  "Braeden Neeley",
  "Aysia Packer",
  "Maximillian Fletcher",
  "Eduardo Mark",
  "Gissel Perry",
  "Brannon Irvine",
  "Citlalli Bolton",
  "Tyrique Sinclair",
  "Ryan Tavares",
  "Johan Burnett",
  "Tasha Mohr",
  "Joanne Frantz",
  "Israel Zielinski",
  "Juliana Almeida",
  "Bryanna Lindsay",
  "Jordin Payton",
  "Krista Womack",
  "Iyanna Byers",
  "Elisha Dye",
  "Dana Amaro",
  "Savion Knox",
  "Lyle Dockery",
  "Zion Barnhill",
  "Donna Vazquez",
  "Cailyn Westbrook",
  "Savion Libby",
];
function splitName(name) {
  return name.split(" ");
}

function createRandomUser(firstName, lastName) {
  return new User({
    first_name: firstName,
    last_name: lastName,
    email: firstName + lastName + "@odinbook.com",
    password: faker.internet.password(),
    avatar: faker.image.avatar(),
  });
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

// ADD USERS TO DB ----->

// let users = [];
// names.forEach((name) => {
//   let firstName = splitName(name)[0];
//   let lastName = splitName(name)[1];

//   let user = createRandomUser(firstName, lastName);
//   users.push(user);
//   user.save((err) => {
//     if (err) return console.log("Failed to save user to DB");
//     return console.log(user + " : Saved to DB!");
//   });
// });
// console.table(users);

//<------- END

// users.forEach((user) => {
//   let u = user
//   user.save((err) => {
//     if (err) return console.log("Failed to save user to DB");
//     return console.log(user + " : Saved to DB!");
//   });
// });

User.find({ _id: { $ne: "63c98aef48230828f1a7b439" } }).exec((err, users) => {
  if (err) return console.log(err);

  User.findById("63c98aef48230828f1a7b439")
    .update({ friends: users })
    .exec((err) => {
      if (err) return console.log("Error updating user", err);
      console.log("Friends added");
    });
});

// console.table(usersArr);

// User.findOne({ email: "testuser@odinbook" })
//   .update({ friends: "63cbdc803834e383152ef84f" })
//   .exec((err, user) => {
//     if (err) console.log("ERROR: ", err);
//     console.log(user);
//   });

db.off;

// // console.log(createRandomUser());

// async function PopulateDatabaseWithUsers() {
//   const user = createRandomUser(1);
//   return console.log(user);
// }

// PopulateDatabaseWithUsers();
