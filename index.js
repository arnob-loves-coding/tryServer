// import
const express = require("express");
const app = express();
const port = 5000;
const cors = require("cors");
require("dotenv").config();
const { MongoClient } = require("mongodb");
const ObjectId = require("mongodb").ObjectId;

// middleware
app.use(cors());
app.use(express.json());

// connect to database
// const uri = 'mongodb+srv://animesh:GTVWtbr9d695ibZg@cluster0.wa3vk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// const client = new MongoClient(uri, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// });

const users = [
  {
    id: 1,
    name: "shabana",
    email: "shabana@gmail.com",
  },
  {
    id: 2,
    name: "shabnur",
    email: "shabnur@gmail.com",
  },
];

app.get("/", (req, res) => {
  res.json("server running");
  console.log("server running");
});

// app.get("/users", (req, res) => {
//   const search = req.query.search;
//   if (search) {
//     const searchResult = users.filter((user) => {
//       user.name.toLocaleLowerCase().includes(search);
//     });
//     res.send(searchResult);
//     console.log(users);
//   } else {
//     res.send(users);
//   }
// });
app.get("/users", (req, res) => {
  const search = req.query.search;
  if (search) {
    const searchResult = users.filter((user) =>
      user.name.toLocaleLowerCase().includes(search)
    );
    res.send(searchResult);
    console.log(search);
  } else {
    res.send(users);
  }
});
app.post("/users", (req, res) => {
  const newUser = req.body;
  newUser.id = users.length + 1;
  users.push(newUser);
  console.log("post hitting", req.body, users.length);
  res.json(newUser);
});

app.get("/fruits/mangoes/fazley", (req, res) => {
  res.send("yummy yummu fazley");
});
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  const user = users[id];
  console.log(user);
  res.send(user);
});
app.listen(port, () => {
  console.log("server running at port:", port);
});
