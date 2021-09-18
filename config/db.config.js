const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
const url = 'mongodb://localhost:27017';

module.exports = (callback)=>{
    MongoClient.connect(url, (error, db)=>{
        let dbo = db.db('mydb');
        callback(dbo.collection("users"));
    });
}
// const MongoClient = require('mongodb').MongoClient;
//   const test = require('assert');
//   // Connection url
//   const url = 'mongodb://localhost:27017';
//   // Database Name
//   const dbName = 'test';
 
//   // Connect using MongoClient
//   MongoClient.connect(url, function(err, client) {
//     // Use the admin database for the operation
//    const adminDb = client.db(dbName).admin();
 
//     // List all the available databases
//     adminDb.listDatabases(function(err, dbs) {
//     //   expect(err).to.not.exist;
//     //   test.ok(dbs.databases.length > 0);
//     console.log(dbs);
//       client.close();
//     });
//   });