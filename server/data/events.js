const { MongoClient } = require('mongodb');
const eventsMock = require('./events.json');

const dbUrl = 'mongodb://ami-db.documents.azure.com:10255';
const dbName = 'events';

async function getEvents() {
  let client;

  try {
    // client = await MongoClient.connect(dbUrl, {
    //   ssl: true,
    //   auth: {
    //     user: '',
    //     password: '',
    //   },
    // });
    console.log('Connected correctly to server');

    // const db = client.db(dbName);
    // const collection = db.collection('events');
    // const events = await collection.find({}).toArray();
    const events = eventsMock;
    return events.map((item) => {
      const {
        id,
        name,
        city,
        url,
        startDate,
        endDate,
        backgroundImageUrl,
        topics,
      } = item;

      return {
        id,
        name,
        city,
        url,
        startDate,
        endDate,
        backgroundImageUrl,
        topics,
      };
    });
  } catch (err) {
    console.log(err.stack);
    // should throw be here?
  } finally {
    // client.close();
  }
}

module.exports = {
  getEvents,
};
