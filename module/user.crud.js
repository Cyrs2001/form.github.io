let dataBase = require('../config/db.config');
let ObjectId = require('bson').ObjectId;


let createUser = (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
    dataBase(async (dbo) => {
        await dbo.findOne({ email: email })
            .then((docs) => {
                if (docs) req.flash("error", "l'email <a> " + email + "</a> est  deja utiliser")
                else {
                    let id = new ObjectId();
                    dbo.insertOne({ _id: id.toHexString(), email: email, password: password })
                        .then(() => { req.flash("succes", "votre compte est cree avec succes"); })
                        .catch((err) => { console.log(err); })
                }
            }).catch(() => res.end(err))
            .finally(() => { res.redirect("/signin"); })
    })

}

let readUser = (req, res) => {
    dataBase(async (dbo) => {
        await dbo.findOne({ _id: req.params.id }, { projection: { password: 0 } })
            .then((docs) => {
                if (docs) {
                    res.locals.profil = docs;
                    res.render('profil');
                }
                else {
                    res.end(' Profil inconnue');
                }
            })
            .catch((err) => {
                req.flash('error', err);
                res.redirect('/');
            })

    })
}
let updateUser = (req, res) => {
    console.log("updating", req.body);
    if (res.locals.user === undefined) res.end("Action Impossible!! vous n'etes pas connectez .")
    if (res.locals.user._id !== req.params.id) res.end("Action Impossible!! vous n'etes pas autorise a modifie ses informations")
    let name, surname, tel, matricule, entite;

    name = (req.body.name === "") ? res.locals.user.name || "" : req.body.name;
    surname = (req.body.surname === "") ? res.locals.user.surname || "" : req.body.surname
    tel = (req.body.tel === "") ? res.locals.user.tel || "" : req.body.tel
    matricule = (req.body.matricule === "") ? res.locals.user.matricule || "" : req.body.matricule
    entite = (req.body.entite === "") ? res.locals.user.entite || "" : req.body.entite

    let update = {
        name,
        surname,
        tel,
        matricule,
        entite
    }
    dataBase(async (dbo) => {
        await dbo.findOneAndUpdate({ _id: req.params.id }, { $set: update }, { new: true })
            .then(() => { console.log('info update succefull'); res.end('info change') })
            .catch(() => { res.end("une erreur c'est produite") })
    })

}
module.exports = {
    createUser: createUser,
    profil: readUser,
    updateUser: updateUser
}
