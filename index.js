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
const uri =
  "mongodb+srv://animesh:GTVWtbr9d695ibZg@cluster0.wa3vk.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
async function run() {
  try {
    await client.connect();
    const database = client.db("tryServer");
    const collection = database.collection("crudOperation");
    //get api
    app.get("/users", async (req, res) => {
      const result = await collection.find({}).toArray();
      res.json(result);
    });
    app.get("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await collection.findOne(query);
      res.json(result);
    });
    // PUT api
    app.put("/users/:id", async (req, res) => {
      const info = req.body;
      console.log(info);
      const filter = { _id: ObjectId(req.params.id) };
      const options = { upsert: true };
      const updateDoc = {
        $set: {
          name: info.name,
          email: info.email,
        },
      };
      const result = collection.updateOne(filter, updateDoc, options);
    });
    // post api
    app.post("/users", async (req, res) => {
      const newUser = req.body;
      const result = await collection.insertOne(newUser);
      res.json(result);
    });

    // //put api
    // app.put("/users/:id", async (req, res) => {
    //   const id = req.params.id;
    //   const updatedUser = req.body;
    //   console.log(id, updatedUser, "hitting update");

    //   const filter = { _id: ObjectId(id) };

    //   const options = { upsert: true };

    //   const updateDoc = {
    //     $set: {
    //       name: updatedUser.name,
    //       email: updatedUser.email,
    //     },
    //   };
    //   const result = await collection.updateOne(filter, updateDoc, options);
    //   console.log(result);
    //   res.json(result);
    // });
    //delete api
    app.delete("/users/:id", async (req, res) => {
      const id = req.params.id;
      const query = { _id: ObjectId(id) };
      const result = await collection.deleteOne(query);
      res.json(result);
    });
  } finally {
    // await client.close();
  }
}
run().catch(console.dir);

// const users = [
//   {
//     id: 1,
//     name: "shabana",
//     email: "shabana@gmail.com",
//   },
//   {
//     id: 2,
//     name: "shabnur",
//     email: "shabnur@gmail.com",
//   },
// ];

app.get("/", (req, res) => {
  res.json("server running");
  console.log("server running");
});

// app.get("/users", (req, res) => {
//   const search = req.query.search;
//   if (search) {
//     const searchResult = users.filter((user) =>
//       user.name.toLocaleLowerCase().includes(search)
//     );
//     res.send(searchResult);
//     console.log(search);
//   } else {
//     res.send(users);
//   }
// });
// app.post("/users", (req, res) => {
//   const newUser = req.body;
//   newUser.id = users.length + 1;
//   users.push(newUser);
//   console.log("post hitting", req.body, users.length);
//   res.json(newUser);
// });

// app.get("/fruits/mangoes/fazley", (req, res) => {
//   res.send("yummy yummu fazley");
// });
// app.get("/users/:id", (req, res) => {
//   const id = req.params.id;
//   const user = users[id];
//   console.log(user);
//   res.send(user);
// });
app.listen(port, () => {
  console.log("server running at port:", port);
});
