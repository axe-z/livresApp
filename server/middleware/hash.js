const bcrypt = require('bcryptjs');

const {MD5} = require('crypto-js')
const jwt = require('jsonwebtoken');
const password = '123abc';


//
// bcrypt.genSalt(10, (err, salt) => {
//   if(err) return next(err);
//      console.log(salt) //$2a$10$cK3MJq7KPXlih10BvKRKe.
//   bcrypt.hash(password, salt, (err, hash) => {
//       if(err) return next(err);
//       console.log(hash) //$2a$10$cK3MJq7KPXlih10BvKRKe.vWXQ7ko1Ni4UFuhwbhcGW5QcY3qkIIy
//   })
// })
//
// const hashedPas = '$2a$10$cK3MJq7KPXlih10BvKRKe.vWXQ7ko1Ni4UFuhwbhcGW5QcY3qkIIy';
// bcrypt.compare(password, hashedPas, (err, result) => {
//   console.log(result); //TRUE SI CA MATCH
// });


const user = {
  id: 1,
  token: MD5('monmotdepasse').toString()
}
 console.log(user)

 const data = {
   id: 10
 }
 const token = jwt.sign(data, '123abc');
 console.log(token)
 console.log(jwt.verify(token, '123abc'))
