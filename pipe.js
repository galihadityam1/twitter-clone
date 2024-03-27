import { MongoClient } from 'mongodb';
import {
  ObjectId
} from 'mongodb';

/*
 * Requires the MongoDB Node.js Driver
 * https://mongodb.github.io/node-mongodb-native
 */

const agg = [
  {
    '$match': {
      '_id': new ObjectId('660257c529db7db1c690f1f7')
    }
  }, {
    '$lookup': {
      'from': 'follows', 
      'localField': '_id', 
      'foreignField': 'followingId', 
      'as': 'followers'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'followers.followerId', 
      'foreignField': '_id', 
      'as': 'followersDetail'
    }
  }, {
    '$lookup': {
      'from': 'follows', 
      'localField': '_id', 
      'foreignField': 'followerId', 
      'as': 'followings'
    }
  }, {
    '$lookup': {
      'from': 'users', 
      'localField': 'followings.followingId', 
      'foreignField': '_id', 
      'as': 'followingsDetail'
    }
  }, {
    '$project': {
      'password': 0, 
      'followingsDetail.password': 0, 
      'followersDetail.password': 0
    }
  }
];

const client = await MongoClient.connect(
  '',
  { useNewUrlParser: true, useUnifiedTopology: true }
);
const coll = client.db('hck-68').collection('users');
const cursor = coll.aggregate(agg);
const result = await cursor.toArray();
await client.close();