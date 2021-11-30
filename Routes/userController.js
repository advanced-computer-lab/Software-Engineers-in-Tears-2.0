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