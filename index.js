const express = require('express');
const cors = require('cors');
const { ObjectId, MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
app.use(cors());
app.use(express.json());
const uri = process.env.DB_URL;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    await client.connect();

    console.log(
      'Pinged your deployment. You successfully connected to MongoDB!',
    );
  } catch (error) {
    console.log(error);
  }
}

// database name
const database = client.db('ReduxRtkQuery');
const collection = database.collection('Tasklist');

app.delete('/task/:id', async (req, res) => {
  const id = req.params.id;
  console.log(id);
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  console.log(result);
});

app.get('/task', async (req, res) => {
  try {
    const tasklist = await collection.find({}).toArray();
    res.json(tasklist);
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ error: error.message });
  }
});
app.post('/task', async (req, res) => {
  try {
    const taskDetails = req.body;
    const newTask = await collection.insertOne(taskDetails);

    res.send(newTask);
  } catch (error) {
    console.error('Something went wrong:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
run().catch(console.dir);
