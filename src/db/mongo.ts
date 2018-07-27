import { MongoClient, Db, Collection } from 'mongodb';
import config from '../config';

const connect = MongoClient.connect(
  config.mongoURI,
  { useNewUrlParser: true }
);

let db: Db;
let test: Collection;

connect.then(client => {
  db = client.db('db1');
  test = db.collection('test');
});

export { db, connect, test };
