const { User } = require('./../models/user');


//AUTH PREND LE COOKIE, ET RETOURNE LE USER ASSOCIER A CE COOKIE:
 
let auth = (req,res,next) => {
  let token = req.cookies.auth;

  User.findByToken(token, (err, user) => {
    if(err) throw err;
    if(!user) return res.json({
      error: true
    })

       req.token = token; //on redonne le token
       req.user = user
       next()
  })
}


module.exports = {  auth }
