let dataBase = require('../config/db.config');
let cryptCookie = require('cookie-signature').sign;


let loginUser = (req, res) => {

    dataBase(async (dbo) => {
        await dbo.find({ email: req.body.email }).toArray()
            .then((user) => {
                if (user[0].password != req.body.password) {
                    req.flash("error", "Mots de passe incorrect");
                    res.redirect('/login');
                } else {
                    req.flash("succes", "BIENVENU " + user[0].email)
                    let secureCookie = cryptCookie(user[0]._id, "610fecb6f6f3eb17e6200482sngPOoBIzxAnW6NzMRmTBgOOzrjHCgjhInt4IDiiXMs")
                    res.cookie("userID", secureCookie, { maxAge: 9000000, httpOnly: true });
                    res.redirect('/');
                }
            }).catch((err) => {
                req.flash("error", "Email inconnue");
                res.redirect('/login');
            })
    });
}
let logoutUser = (req, res, next) => {
    res.clearCookie("userID");
    res.redirect('/');
    next();
}
module.exports = {
    loginUser: loginUser,
    logoutUser: logoutUser
}

