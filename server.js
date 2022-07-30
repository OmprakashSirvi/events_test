const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });
const app = require("./app");
const client = require("./database");

// const app = express();

// app.use(express.json());

// or as an es module:
// import { MongoClient } from 'mongodb'

// Connection URL

client.connect(async function (err, database) {
  if (err) throw err;

  console.log("Database connected successfully");
  db = database;

  //   await listDatabases(client);

  const port = process.env.PORT || 8080;
  const host = "127.0.0.1";
  // Start the application after the database connection is ready
  app.listen(port, host, () => {
    console.log(`App is up and running at : http://${host}:${port}`);
  });
});

// async function main() {
//   const url =
//     "mongodb+srv://ops_iot_database:kiH91aZkpPXGouHH@cluster0.grmlk.mongodb.net/?retryWrites=true&w=majority";
//   const client = new MongoClient(url);

//   try {
//     const port = process.env.PORT || 8080;
//     const host = "127.0.0.1";
//     await client.connect();
//     // await createEvent(client, {
//     //   name: "test_event1",
//     //   tagline: "this is a test event",
//     // });
//     app.listen(port, host, () => {
//       console.log(`App is up and running at : http://${host}:${port}`);
//     });
//   } catch (err) {
//     console.error(err);
//   } finally {
//     await client.close();
//   }

//   return "Database Initialized";
// }

// main()
//   .then(console.log)
//   .catch(console.error)
//   .finally(() => client.close());

// async function createEvent(client, newData) {
//   const result = await client
//     .db("jobTest")
//     .collection("events")
//     .insertOne(newData);

//   console.log(`New event created, its id : ${result.insertedId}`);
// }

async function listDatabases(client) {
  const databaseList = await client.db().admin().listDatabases();

  console.log("Database names : ");
  databaseList.databases.forEach((ele) => {
    console.log(ele.name);
  });
}

// app.get("/api/v3/app/events/:id", async (req, res) => {
//   const id = req.params.id;
//   console.log(id);

//   const result = await client
//     .db("jobTest")
//     .collection("events")
//     .findOne({ _id: ObjectID(id) });

//   if (!result) console.log("Could not find your document");

//   console.log(result);
// });
