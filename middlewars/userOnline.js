let dataBase = require('../config/db.config');
let decryptCookie = require('cookie-signature').unsign
let cookieParser = require('cookie').parse;


module.exports = (req, res, next) => {
    if (!req.headers.cookie) { res.locals.user = undefined; next(); }

    let userCookie = cookieParser(req.headers.cookie).userID || " ";
    console.log(userCookie);
    let possibleID = decryptCookie(userCookie, "610fecb6f6f3eb17e6200482sngPOoBIzxAnW6NzMRmTBgOOzrjHCgjhInt4IDiiXMs");
    dataBase((dbo) => {
        dbo.findOne({ _id: possibleID })
            .then((data) => {
                if (data === undefined) throw Error("pas de cookie userID")
                res.locals.user = data;
                next();
            })
            .catch(() => {
                res.locals.user =undefined;
                next();
            })
    });

}
