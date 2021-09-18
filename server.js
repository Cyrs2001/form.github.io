let express = require("express");
let app = express();
let auth = require('./module/auth');
let crud = require('./module/user.crud');
let session = require('express-session');
let bodyParser = require('body-parser');
let post = require('./module/posts/post');
const userCrud = require("./module/user.crud");

let https = require('https');
let http = require('http');

//pour rendre les pages html (moteur de template)
app.set('port', 8000)
app.set('view engine', 'ejs');
//session (express-session)
app.use(session({
    secret: "azert",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//pour les chemins
app.use('/assets', express.static('public'));
app.use('/dowland', express.static('public'));




//middlewars
app.use(require('./middlewars/flash'));
app.use(require('./middlewars/userOnline'));


//Routes

//Acceuil
app.get('/', post.postList);

//route d'inscription

app.get('/signin', (req, res) => {
    res.render('pages/auth/signIn');
    
});

app.post('/signin', crud.createUser);
app.get('/profil/:id', userCrud.profil);
app.post('/update-profil/:id', userCrud.updateUser);
//route de connexion

app.get('/login', (req, res) => {
    res.render('pages/auth/login');
});

app.post('/login', auth.loginUser);

//routes de Deconnexion

app.get('/logout', auth.logoutUser);

//route de publication

app.post('/newPost',post.newPost )

app.get('/dowland', (req, res, next)=>{
//    res.status(200).sendFile('D:/index/Projet_mini_forum/public/pdf.pdf')
   res.download('D:/index/Projet_mini_forum/public/pdf.pdf')
})


app.get('/like/:id',post.like);



http.createServer(app).listen(8001, ()=>{
    console.log('port 8000');
})
// app.listen(process.env.PORT || 8000, ()=>{
//     console.log("listen port 8000");
// });



//triton et  le regeneration