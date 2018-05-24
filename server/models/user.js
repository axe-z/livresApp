const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const SaltLevel = 10;
const config = require('./../config/config.js').get(process.env.NODE_ENV)


const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    unique: 1 //true 0 false
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  prenom: {
    type: String,
    maxlength: 50
  },
  nom: {
    type: String,
    maxlength: 50
  },
  role: {
    type: Number,
    default: 0
  },
  token: {
    type: String
  }
});

///AVANT DE CREER LE USER, ON VA SALTER HASHER ET PASSWORD:
userSchema.pre('save', function(next) {
  var user = this;  // va etre le new User (user.email, user.password)

  if (user.isModified('password')) {

    bcrypt.genSalt(SaltLevel, function(err, salt) {
      if (err) return next(err);

      bcrypt.hash(user.password, salt, function(err, hash) {
        if (err) return next(err);

        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});





//
// CE QUI VERIFIE LA VALIDITÉ D UN USER //ES 5
userSchema.methods.comparePassword = function(userPassword, callback) {
  //console.log("this", this) //fiche du user

  bcrypt.compare(userPassword, this.password, function(err, isMatch) {
    //this = on aura le user

    if (err) throw callback(err);

    callback(null, isMatch);
    //res.status(200).send(isMatch)  //true si bon ou false si incorrect
    //console.log('req', userPassword); //123456
    //console.log('user', this.password); //$2a$10$vlhLSfVBPEhR.E...
  });
};





//CE QUI DONNE UN TOKEN DE VISITE APRES VERIFICATION //Fn es5,config.SECRET VIENT D UN FICHIER CACHÉ
userSchema.methods.generateToken = function(callback) {
  // console.log(this)
   let user = this;

	let token = jwt.sign(user._id.toHexString(), config.SECRET );

	user.token = token; //mets le token
  //save le user a la toute fin
  user.save(function (err, user){
    if (err) throw callback(err);
    callback(null, user)
  })
};

//V2.0 sans creer the user
// userSchema.methods.generateToken = function(callback) {
// 	let token = jwt.sign(this._id.toHexString(), config.SECRET );
//
// 	this.token = token;
//   this.save(function (err, user){
//     if (err) throw callback(err);
//     callback(null, user)
//   })
// };


//
// //le user a un token a sa creation, comment verifier si il l a toujours sur une autre route.
userSchema.statics.findByToken = function (token,callback){
 let user = this;

  jwt.verify(token, config.SECRET, function (err, decode){  //decode a le user _id si jwt fonctionne
     //console.log(decode) //_id
      user.findOne({ _id : decode, token: token }, function (err, user){
        if (err) throw callback(err);
        callback(null, user)
      })
  })
}

userSchema.methods.deleteToken = function (token, callback){
      let user = this;

      user.update({$unset: {token:1}}, (err, user) => {
            if (err) return callback(err);
            callback(null, user)
      });
}



const User = mongoose.model('User', userSchema);
module.exports = { User }
