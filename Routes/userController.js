const Users = require('../Models/Users');
require("dotenv").config({ path: "../config.env" });
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.getUserByID = (req, res) => {
    var terms = {};
    for(elem in req.body){
      if(!isNullorWhiteSpace(req.body[elem])){
        terms[elem] = req.body[elem];
      }
    }
    Users.find(terms)
    .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
}

exports.login = (req, res) => {
  const userLoggingIn = req.body;
  Users.findOne({Username: userLoggingIn.Username})
    .then(dbUser => {
      if(!dbUser){
        return res.json({
          message: 'Invalid Username or Password'
        })
      }
      bcrypt.compare(userLoggingIn.Password, dbUser.Password)
        .then(isCorrect => {
          if(isCorrect){
            const payload = {
              id : dbUser._id,
              First_Name : dbUser.First_Name,
              Type: dbUser.Type
            }
            jwt.sign(
              payload,
              process.env.JWT_SECRET,
              {expiresIn: 86400},
              (err, token) => {
                if(err) return console.log(err)
                  res.send({
                    message: 'Success',
                    token: token,
                    id : dbUser._id,
                    First_Name : dbUser.First_Name,
                    Email: dbUser.Email
                    
                })
              }
            )
          }
          else{
            return res.json({
              message: 'Invalid Username or Password'
            })
          }
        })
    })
}

exports.changePassword= (req, res)=>{
  const old_password=req.body.oldPassword;
  const new_password=req.body.newPassword;
  Users.findById(req.body.userID)
    .then(dbUser => {
        const hash= dbUser.Password;
        bcrypt.compare(old_password,hash)
        .then(isCorrect=>{
          if(isCorrect){
            //now check new password and confirm if match
              bcrypt.hash(new_password,10)
              .then(hashedPass=>{
                dbUser.Password = hashedPass;
                dbUser.save()
                res.send({message: 'Success'})
              })
          }
          else{
            return res.send({
              message: 'Incorrect Password'
            })
          }
        })
    })
}

exports.updateUser = (req, res)=>{
  Users.findByIdAndUpdate(req.params.userID, req.body)
  .then(result => {
      res.status(200).send("User updated")})
  .catch(err => {console.log(err); res.status(500);});
}

exports.createUser = async (req, res)=>{
  const First_Name= req.body.First_Name;
  const Last_Name= req.body.Last_Name;
  const Email= req.body.Email.toLowerCase();
  const Home_Address= req.body.Home_Address;
  const Telephone_Number= req.body.Telephone_Number;
  const Passport_Number= req.body.Passport_Number;
  const Password= await bcrypt.hash(req.body.Password, 10);
  const Username= req.body.Username.toLowerCase();
  const Type= req.body.Type;
  const newUser= new Users({
    First_Name,
    Last_Name,
    Email,
    Home_Address,
    Telephone_Number,
    Passport_Number,
    Password,
    Username,
    Type,
  });
  newUser.save(function(err){
    res.send(newUser);
  });
}

exports.updateAllUsersWithBooking = (bookings, res) =>{
  // const promArr = []
  const fetchedUserProms = {}
  console.log(bookings.length)
  bookings.map(booking=>{

    if(!fetchedUserProms[booking.userID]){
      fetchedUserProms[booking.UserID] = Users.findById(booking.userID, 'Bookings')
    }
  })


  const userArrProm = Promise.all(Object.values(fetchedUserProms));

  userArrProm.then(users=>{
    // console.log(users);
    users.map(user=>{
      console.log('the dudes bookings i kms now:',user.Bookings)
      bookings.forEach(booking=>{
        user.Bookings = user.Bookings.filter(id =>{
          console.log(booking.id !== id)
          return booking.id !== id
        })
      })
      // console.log(user);
    })
  
    // console.log(users[0].id);
    users.map(user=>{
      console.log('in user map:');
      console.log('current user:', user)
      console.log('bookings:', bookings);
      Users.findByIdAndUpdate(user.id, {Bookings:user.Bookings})
      .then(result=>{
        // res.send('user updated');
        console.log('user updated successfully');
      })
      .catch(err =>console.log(err));
    })
  })

  return userArrProm;
}

function isNullorWhiteSpace(string) {
    if (string == null) {
      return true;
    }
    if (typeof (string) != "string") {
      return false;
    };
  
    const x = string.trim();
    return x.length === 0;
  }