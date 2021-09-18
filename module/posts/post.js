const MongoClient = require('mongodb').MongoClient;
let decryptCookie = require('cookie-signature').unsign;
let dataBase = require('../../config/db.config');
let cookieParser = require('cookie').parse;
const url = 'mongodb://localhost:27017';

let PostdataBase = (callback) => {
    MongoClient.connect(url, (error, db) => {
        let dbo = db.db('mydb');
        callback(dbo.collection("publication"));
    });
}



let newPost = (req, res, next) => {
    let userCookie = cookieParser(req.headers.cookie).userID;
    let possibleID = decryptCookie(userCookie, "610fecb6f6f3eb17e6200482sngPOoBIzxAnW6NzMRmTBgOOzrjHCgjhInt4IDiiXMs");
    dataBase((dbo) => {
        dbo.find({ _id: possibleID }).toArray((err, data) => {
            if (err) throw err;

            if (data === [] || data === undefined) {
                console.log("autheur");
            }
            else {
                console.log("autheur save");
                let author=  {id :data[0]._id, name : data[0].email}
                let content = req.body.newPost;
                PostdataBase((dboo) => {
                    let date = new Date();
                    let newPost = { _id: date.valueOf(), author: author, message: content, like: 0, unlike: 0 };
                    dboo.insertOne(newPost, (err, docs) => {
                        if (err) throw err;
                        console.log("post sauvegarde");
                        console.log(docs);
                        res.redirect('/')
                        next();
                    })
                });

            }
        });
    });
}
module.exports.newPost = newPost;

let postList = (req, res) => {

    PostdataBase((dbo) => {
        dbo.find().sort({ _id: -1 }).toArray((err, data) => {
            if (err) throw err;
            res.locals.posts = data;
            console.log("chargement des publications");
            res.render('pages/acceuil')
        });
    })
}
let userLiked = (req, res)=>{
    if(res.locals.user.likePostsListe){
        for(likePost of res.locals.user.likePostsListe){
            if(likePost === req.params.id)
            return true;
        }
        return false;
    }else{
        return false;
    }

}
module.exports.postList = postList;
let like = (req, res) => {
    console.log(res.locals.user);
    if (res.locals.user.email === undefined) {
        res.end('Connectez vous pour like');
    }else if(userLiked(req, res)){
        res.redirect('/');
    }
    else{
        PostdataBase((dbo) => {
            dbo.find({ _id: Number(req.params.id) }).toArray((err, data) => {
                if (err) throw err;
                if (data[0] === undefined) res.redirect('/')
                else {
                    let nblike = data[0].like;
                    nblike += 1;
                    PostdataBase((dbo) => {
                        dbo.findOneAndUpdate({ _id: Number(req.params.id) }, { $set: { like: nblike } }, (err, doc) => {
                            if (err) throw err;
                            console.log("Publication liké ;)");
                            dataBase( (dbo)=>{
                                dbo.findOneAndUpdate({ _id: res.locals.user._id }, { $pop: { likePostsListe:   req.params.id} }, (er, resp)=>{
                                    console.log('ajoute a la liste de poste like');
                                } )
                            })
                            res.redirect('/');
                        });
                    });
                }
            })
        })
    }

}
module.exports.like = like;
