// let MongoClient = require('mongodb').MongoClient;
// let url = "mongodb://localhost:27017/";


// MongoClient.connect(url, function (err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb0");
//     dbo.createCollection("customers", function (err, res) {
//         if (err) throw err;
//         console.log("Collection created!");
//         db.close();
//     });
// });
// // // MongoClient.connect(url, (err, db) =>{
// // //     if (err) throw err;
// // //     let dbo = db.db("mydb");
// // //     dbo.collection("customers").insertOne({ _id : "zzza"}, (err, res)=>{
// // //         if (err) throw err;
// // //         console.log("dee");
// // //         db.close();
// // //        });

// // // });



// // let dataBase = require('./config/db.config');

// // let uniqemail = (mail)=>{    
// //     dataBase.usersLoginTable((db)=>{
// //         let newUsers = {email : mail};
// //         let dbo = db.db("mydb");
// //         dbo.collection("ussss").insertOne(newUsers, (err, res)=>{
// //             if (err) throw err;
// //             console.log("unique");
// //             db.close();
// //         });
// //     });
// // }
// // uniqemail("sewa@")
// // let dataBase = require('./config/db.config')

// // dataBase.find().toArray((error, data) => {
// //     console.log("premie");
// // });

// // dataBase((dell) => {
// //     dell.find().toArray((error, data) => {
// //         console.log("seconde");
// //     });
// // })


// // console.log(dataBase);
// // const MongoClient = require('mongodb').MongoClient;
// // const url = 'mongodb://localhost:27017';
// // let ObjectId = require('./node_modules/bson').ObjectId;

// // MongoClient.connect(url, async (error, db) => {


// //     let dbo = db.db('mydb');


// // findOneAndUpdate(update: UpdateFilter<TSchema>, options: FindOneAndUpdateOptions, callback: Callback<ModifyResult<TSchema>>);

// // dbo.collection("publication").findOneAndUpdate({ _id : 1628591495620}, {$set :{like : 0, unlike :0}}, (err, res)=>{

// //     console.log("Publication liké ;)");
// // })
// // let a = await dbo.collection("publication").findOneAndUpdate({_id : }, {$set :}, {new : true}, (err, res)=>{

// // })  
// // console.log(a);
// // })

// // let text = "salut comment vas tu? 234"
// // console.log(Number(text));

// const { FedaPay, Transaction } = require('fedapay')

// /* Remplacez VOTRE_CLE_API par votre véritable clé API */
// // "pk_live_GYLUIdN_o1LPusCTy105xUQF
// FedaPay.setApiKey("sk_live_yN4klijM7eeTLUTw41mzKIELd");

// /* Précisez si vous souhaitez exécuter votre requête en mode test ou live */
// FedaPay.setEnvironment('sandbox'); //ou setEnvironment('live');

// /* Créer la transaction */
// let x = async () => {
//     console.log('debut');
//     const transaction = await Transaction.create({
//         description: 'Description',
//         amount: 2000,
//         callback_url: 'http://localhost:8000/',
//         currency: {
//             iso: 'XOF'
//         },
//         customer: {
//             firstname: 'John',
//             lastname: 'Doe',
//             email: 'john.doe@example.com',
//             phone_number: {
//                 number: '91778634',
//                 country: 'BJ'
//             }
//         }
//     }).then(() => { console.log('dieu thank'); })
//         .catch((ee) => {
//             console.log('que faut il faire donc');
//             console.log(ee);
//         });
//     console.log('fin');
//     console.log(transaction);

// }
// x();
const { jsPDF } = require("jspdf"); // will automatically load the node version

// const doc = new jsPDF();
// let d = document.querySelector('body')
// let a = " <body> sss </body>"
// doc.html(d).then( (doc)=>{
//     console.log('succes');
//     doc.save("e.pd");
// }).catch((e)=> console.log("echec "+ e) )

