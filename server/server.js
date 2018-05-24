const express = require('express');
const app = express();
const bodyParser = require('body-parser');
//const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const config = require('./config/config').get(process.env.NODE_ENV)

const cookieParser = require('cookie-parser');

const { User } = require('./models/user')
const { Livre } = require('./models/livre')
const { auth } = require('./middleware/auth')

app.use(bodyParser.json())
app.use(cookieParser())

//pour que heroku sache.
app.use(express.static('client/build'))



mongoose.connect(config.DATABASE)
.then(con => {
 console.log('connection reussi...')
}).catch(err => {
 console.log(err)
});


///////////////////////////////////////////////////////////////////////////////////////////////
                            //   GET //
///////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////VERIFIE SI LOGGUE ET REDIRIGE EN CONSEQUENCE
app.get('/api/auth', auth, (req, res) => {
        //auth retourne un user si loguedin
      res.json({
        isAuth: true,
        id: req.user._id,
        email: req.user.email,
        prenom: req.user.prenom,
        nom: req.user.nom
      })
});






////////////////////////////////////////RECHERCHE DE UN LIVRE
app.get('/api/getLivre', (req, res) => {
  let id = req.query.id //  http://localhost:3001/api/getLivre?id=5ae87575ffc47d61c00807fb

  Livre.findById(id).then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(400).send(err);
  });
});


////////////////////////////////////////RECHERCHE DE plusieurs LIVRES
app.get('/api/livres', (req, res) => {
  //http://localhost:3001/api/livres?skip=1&limit=5&order=asc
    let skip = parseInt(req.query.skip) //besoin dun string
    let limit = parseInt(req.query.limit) //besoin dun string
    let order = req.query.order

    //ORDER = asc OU desc .... 1 ET -1 dans mongoose
    //CB
    // Livre.find().skip(skip).sort({_id: order}).limit(limit).exec((err,data) => {
    //     if (err) res.status(400).send(err);
    //       //si ca passe
    //       res.send(data)
    // })

    //promise
    Livre.find().skip(skip).sort({_id: order}).limit(limit).then(data => {
     res.send(data)
    })
    .catch(err => {
      res.status(400).send(err);
    });

});

//////////////////////////////////////// USER logout detruit le token.

app.get('/api/logout', auth, (req, res) => {        // le auth retourne le user
    //res.send(req.user)//on a le user on peut l utiliser
    req.user.deleteToken(req.token , (err,user) => {
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
});





app.get('/api/getCritique', (req, res) => {
  let id = req.query.id //par l url'/api/getCritique?id=....'

  User.findById(id, (err,data) => {
      if(err) return res.status(400).send(err);
      res.json({
        prenom: data.prenom,
        nom: data.nom
      })
  });

  //promise
  // User.findById(id).then(data => {
  //   res.json({
  //     prenom: data.prenom,
  //     nom: data.nom
  //   })
  // })
  // .catch(err => {
  //   return res.status(400).send(err);
  // });
});

app.get('/api/users', (req, res) => {        // VA chercher tous les users

  User.find({}, (err,data) => {
      if(err) return res.status(400).send(err);
      res.status(200).send(data)
  });

  //promise
  // User.find().then(data => {
  //   res.status(200).send(data)
  // })
  // .catch(err => {
  //   return res.status(400).send(err);
  // });
});


app.get('/api/users_critiques', (req, res) => {
  // VA chercher tous livres de user : http://localhost:3001/api/users_critiques?user=ggjroeijiogjreogjerg

  Livre.find({ ownerId: req.query.user }).exec((err, data) => {
    if (err) return res.status(400).send(err);
    res.status(200).send(data);
  });
});



///////////////////////////////////////////////////////////////////////////////////////////////
                            //   POST //
///////////////////////////////////////////////////////////////////////////////////////////////

////////////////////////////////////////CREATION DE LIVRE
app.post('/api/livre', (req, res) => {
  //on va faire un livre avec le data recu par localhost:3000/api/livre dans postman/post on ajoute l objet
  const livre = new Livre(req.body) //on prend tout
  //ensuite le saver sur la db

 //CB
  // livre.save((err,doc) => {
  //   if (err) res.status(400).send(err);
  //     //si ca passe
  //     res.status(200).json({
  //       post: true,
  //       bookId: doc._id
  //     })
  //     console.log(doc)
  // })

//promise
  livre.save()
  .then(doc => {
    res.status(200).json({
      post: true,
      bookId: doc._id
    });
  })
  .catch(err => {
    res.status(400).send(err);
  });

});

////////////////////////////////////////CREATION DE USER

app.post('/api/enregistrement', (req, res) => {

  const user = new User(req.body) //on prend tout
  //ensuite le saver sur la db
//   console.log(user)
 //CB
  user.save((err,doc) => {
      if (err) res.json({success: false}).send(err);

      //si ca passe
      res.status(200).json({
       success: true,
       user : doc
      })
  })
//promise
    // user.save().then(doc => {
    //    //console.log(doc)
    //  res.status(200).json({
    //   success: true,
    //   user: doc
    // })
    // }).catch(err => {
    // res.json({success: false}).send(err);
    // })
});


////////////////////////////////////////LOGIN

//CB
app.post('/api/user/login', (req, res) => {

  User.findOne({email: req.body.email}, (err, user) => {
    if (!user) res.json({isAuth: false ,message: "Cet utilisateur n'est pas au dossier..."});

    if(user){
    user.comparePassword(req.body.password, (err, isMatch) => {
        if(!isMatch) return res.json({isAuth: false , message: "Mauvais Mot De Passe"});

        //SI MATCH, ON GENERE UN TOKEN

        user.generateToken((err, user) => {
          if(err) return res.status(400).send(err);
          //si ca marche - faire le cookie
          res.cookie('auth', user.token).json({
            isAuth: true,
            id: user._id,
            email: user.email
          }) // le cookie reste sur le domaine
        });

        // res.status(200).send(isMatch) //pour checker si avant token
    });
    }
  });

//PROMISE
    // User.findOne({ email: req.body.email })
    //   .then(user => {
    //     if (!user) res.json({isAuth: false ,message: "Cet utilisateur n existe pas..."});
    //
    //     user.comparePassword(req.body.password, (err, isMatch) => {
    //       if (!isMatch) return res.json({isAuth: false , message: "Mauvais mot de passe"});
    //
    //         //GENERE un TOKEN
    //       user.generateToken((err, user) => {
    //         if (err) return res.status(400).send(err);
    //         res.cookie('auth', user.token).json({
    //           isAuth: true,
    //           id: user._id,
    //           email: user.email
    //         }) // le cookie reste sur le domaine; // le cookie reste sur le domaine
    //       });
    //       //  res.status(200).send(isMatch) //true
    //     });
    //     //console.log(user);
    //   })
    //   .catch(err => {
    //     console.log(err);
    //     if (err) throw err;
    //   });

});
///////////////////////////////////////////////////////////////////////////////////////////////
                            //   UPDATE //
///////////////////////////////////////////////////////////////////////////////////////////////



app.post('/api/livre/update', (req, res) => {

//CB
Livre.findByIdAndUpdate(req.body._id, req.body, { new: true }, (err, data) => {
  if (err) res.status(400).send(err);
  res.status(200).json({
    post: true,
    data
  });
});

//promise
  // Livre.findByIdAndUpdate(req.body._id, req.body, {new:true}).then(data => {
  //   res.status(200).json({
  //    post: true,
  //    data
  //  })
  // })
  // .catch(err => {
  //   res.status(400).send(err);
  // }); //on redonne tout

});



///////////////////////////////////////////////////////////////////////////////////////////////
                            //   DELETE //
///////////////////////////////////////////////////////////////////////////////////////////////

app.delete('/api/delete_livre', (req, res) => {
  let id = req.query.id //  http://localhost:3000/api/delete_livre?id=5ae874280751675ef922b1ab

//CB
//   Livre.findByIdAndRemove(id , (err, data) => {
//   if (err) res.status(400).send(err);
//   res.status(200).json(true);
// });

//promise
  Livre.findByIdAndRemove(id).then(data => {
    res.status(200).json(true)
  })
  .catch(err => {
    res.status(400).send(err);
  });

  });

//pour toujours pointer index,html en tout temps 
if(process.env.NODE_ENV === 'production'){
  const path = require('path')
  app.get('/*',  (req,res) => {
    res.sendfile(path.resolve(__dirname, '../client', 'build', 'index.html')) //fera le path default
  })
}



const port = process.env.PORT || 3001  //3000 si localhost
app.listen(port, () =>  console.log(`ca roule sur le ${port}`));
