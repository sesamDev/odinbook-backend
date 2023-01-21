// const { faker } = require("@faker-js/faker/locale/en");
// const User = require("./models/user");

// function createRandomUser() {
//   return {
//     first_name: "John",
//     last_name: "Doe",
//     // email: faker.internet.exampleEmail(),
//     // password: faker.internet.password(),
//     // avatar: faker.image.avatar(),
//     // postImg: faker.image.animals(640, 640, true),
//   };
// }

// // Set up mongoose connection
// const mongoose = require("mongoose");
// // eslint-disable-next-line no-undef
// const mongoDB = process.env.DB;
// mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
// const db = mongoose.connection;
// db.on("error", console.error.bind(console, "connection error:"));

// function createRandomUser() {
//   return {
//     first_name: "John",
//     last_name: "Doe",
//     email: "jd@jd.com",
//     password: "123456",
//     avatar: "defaultPictureURL",
//     // postImg: faker.image.animals(640, 640, true),
//   };
// }

// // // first_name: { type: String, min: 1, max: 100, required: true },
// // //   last_name: { type: String, min: 1, max: 100, required: true },
// // //   email: { type: String, min: 1, max: 100, required: true },
// // //   password: { type: String, min: 1, max: 100, required: true },
// // //   admin: { type: Boolean, default: false },
// // //   avatar: { type: String, default: defaultAvatar },
// // //   posts: [{ type: Schema.Types.ObjectId, ref: "Post" }],

// Array.from({ length: 1 }).forEach(() => {
//   const user = new User(createRandomUser());
//   user.save((err) => {
//     if (err) return console.log("Failed to save user to DB");
//     return console.log(user + " : Saved to DB!");
//   });
// });

// // console.log(createRandomUser());
