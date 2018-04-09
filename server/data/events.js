const { MongoClient } = require('mongodb');
const { dbUrl, dbUser, dbPass } = require('../config');
// const eventsMock = require('./events.json');

async function getEvents() {
  let client;

  try {
    client = await MongoClient.connect(dbUrl, {
      ssl: true,
      auth: {
        user: dbUser,
        password: dbPass,
      },
    });
    console.log('Connected correctly to server');

    const dbName = 'events';
    const db = client.db(dbName);
    const collection = db.collection('events');
    const events = await collection.find({}).toArray();
    // const events = eventsMock;
    return events;
    // return events.map(item => {
    //   const {
    //     id,
    //     name,
    //     city,
    //     url,
    //     startDate,
    //     endDate,
    //     backgroundImageUrl,
    //     topics,
    //   } = item;

    //   return {
    //     id,
    //     name,
    //     city,
    //     url,
    //     startDate,
    //     endDate,
    //     backgroundImageUrl,
    //     topics,
    //   };
    // });
  } catch (err) {
    console.log(err.stack);
    // should throw be here?
  } finally {
    client.close();
  }
}

module.exports = {
  getEvents,
};
