import assert from "assert";
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://heroku_pk1k5n41:d06bmqdmnl6un8vhuldqr6t3r4@ds155934.mlab.com:55934/heroku_pk1k5n41';

export const insertDocument = (data) => {
  delete data._id;
  MongoClient.connect(url, (err, db) => {
    assert.equal(null, err);
    db.collection('users').insertOne( data , function(err, result) { 
      assert.equal(err, null);
      console.log("Inserted a document into the testSubjects collection.");
    });
    db.close();
  });
};

export const updateDocument = (data, userId) => {
  MongoClient.connect(url , (err, db) => {
    assert.equal(null,err);
    db.collection('users').update(
      {_id : userId},
      data,
      {upsert: true}
    );
    db.close();
  });
};

export const findDocument = async (userId) => {
  let doc;
  const db = await MongoClient.connect(url);
  let docs = await db.collection('users').find({userId: userId}).sort({timeStamp: -1}).toArray();
  doc = docs[0];
  return doc;
}

export const findAllDocuments = async () => {
  const db = await MongoClient.connect(url);  
  let docs = await db.collection('users').find({}).toArray();
  return docs;
}
