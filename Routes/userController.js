// #Task route solution
const User = require('../models/User');
exports.addUser = (req, res) => {
    
    const user = new User(req.body)
  
    user.save()
      .then(result => {
        res.send(result);
        console.log("added");
      })
      .catch(err => {
        console.log(err);
      });
  };
// getting all the users

exports.viewUsers = (req, res) => {                                               ``
    User.find({})
      .then(result => {
        res.send(result);
      })
      .catch(err => {
        console.log(err);
      });
    };

    exports.getUser = (req, res) => {
      User.find({Name:req.params.name})
        .then(result => {
          res.send(result);
        })
        .catch(err => {
          console.log(err);
        });
    };

    exports.updateUser = (req,res)=>{
      User.findByIdAndUpdate(req.params.id,req.body).then(result =>{
  
          res.status(200).send("User updated ");
          console.log('The User is Updated successfully !');
      }).catch(err => {
          console.log(err);
        });
  
    };
  
    //Deleting an existing user
    exports.deleteUser = (req,res)=>{
      User.findByIdAndRemove(req.params.id).then(result =>{
  
          res.status(200).send("User Deleted ");
          console.log("The User is deleted successfully !");
      }).catch(err => {
          console.log(err);
        });
  
    };