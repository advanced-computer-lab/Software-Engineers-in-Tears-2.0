const Users = require('../Models/Users');

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

exports.updateUser = (req, res)=>{
  Users.findByIdAndUpdate(req.params.userID, req.body)
  .then(result => {
      res.status(200).send("User updated")})
  .catch(err => {console.log(err); res.status(500);});
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