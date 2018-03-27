const { MongoClient } = require('mongodb');

const url = 'mongodb://ami-db.documents.azure.com:10255';
const dbName = 'events';
let docs;

async function getEvents() {
  let client;

  try {
    client = await MongoClient.connect(url, {
      ssl: true,
      auth: {

      },
    });
    console.log('Connected correctly to server');

    const db = client.db(dbName);
    const col = db.collection('events');

    docs = await col.find({}).toArray();
    return docs;
  } catch (err) {
    console.log(err.stack);
  } finally {
    client.close();
  }
}

module.exports = {
  getEvents,
};
