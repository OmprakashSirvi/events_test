const client = require("../database");
const AppError = require("../utils/AppError");
const CatchAsync = require("../utils/CatchAsync");
const { ObjectID } = require("bson");

exports.getEventById = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const data = await client
    .db("jobTest")
    .collection("events")
    .findOne({ _id: ObjectID(id) });

  if (!data) return next(new AppError("No documents found ", 404));

  res.status(200).json({
    status: "success",
    message: "Found your document",
    data,
  });
});

exports.createEvent = CatchAsync(async (req, res, next) => {
  let body = req.body;
  body.schedule = new Date(body.schedule);

  const data = await client.db("jobTest").collection("events").insertOne(body);

  if (!data) return next(new AppError("No documents found ", 404));

  res.status(200).json({
    status: "success",
    message: "Created your document",
    id: data.insertedId,
  });
});

exports.updateEvent = CatchAsync(async (req, res, next) => {
  const id = req.params.id;
  const body = req.body;

  const data = await client
    .db("jobTest")
    .collection("events")
    .updateOne({ _id: ObjectID(id) }, { $set: { name: body.name } });

  if (!data) return next(new AppError("No documents found ", 404));

  res.status(200).json({
    status: "success",
    message: "Created your document",
    id: data,
  });
});

exports.delteEvent = CatchAsync(async (req, res, next) => {
  const id = req.params.id;

  const data = await client
    .db("jobTest")
    .collection("events")
    .deleteOne({ _id: ObjectID(id) });

  if (!data) return next(new AppError("No documents found ", 404));

  res.status(200).json({
    status: "success",
    message: "deleted your document",
    data,
  });
});

exports.getAllEvents = CatchAsync(async (req, res, next) => {
  const type = req.query.type || "latest";
  const limit = req.query.limit * 1 || 5;
  const page = req.query.page * 1 || 1;

  const allData = client
    .db("jobTest")
    .collection("events")
    .find()
    .sort({ schedule: 1 })
    .limit(limit)
    .skip((page - 1) * limit);

  const data = await allData.toArray();
  res.status(200).json({
    status: "success",
    message: "Got your documents",
    length: data.length,
    data,
  });
});
