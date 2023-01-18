const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 


 
// Signup
// This section will help you create a new record.
recordRoutes.route("/record/add").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
        fullname: req.body.fullname,
        username: req.body.username,
        email: req.body.email,
        country: req.body.country,
        password: req.body.password,
        timezone: req.body.timezone,
        dateofbirth: req.body.dateofbirth,
        phoneNo: req.body.phoneNo,
        gender: req.body.gender
    };

    let myquery2 = {email: myobj.email};
    let myquery3 = { $or: [ { email: myobj.email}, { username: myobj.username} ] };

    db_connect.collection("records").findOne(myquery3, function (err, userExist) {
          if(userExist == null) {
            db_connect.collection("records").insertOne(myobj, function (err, res) {
              if (err) throw err;
              response.json(res);
            });
          }
          else {
            return response.status(400).json({error: "User with this Email or Username already exists!"});
            // return response.status(400).send("User with this email already exists!");   
          }
          
         

    });

    
 
});
 

// Login Authentication
// This section will help you get a list of all the records.
recordRoutes.route("/record/validate").post(function (req, res) {
  let db_connect = dbo.getDb();
  let { email, password } = req.body; 
  
  let myquery = { email: email};
  let myquery2 = { password: password};
  let myquery3 = { $and: [ { email: email}, { password: password} ] }
  db_connect
    .collection("records")
    .findOne(myquery3, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
    
 });





// New Meeting
// This section will help you create a new meeting.
recordRoutes.route("/meeting/create").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    id: req.body.id,
    title: req.body.title,
    description: req.body.description,
    start_time: req.body.start_time,
    duration: req.body.duration,
    status: req.body.status,
    location: req.body.location,
    password: req.body.password,
    dates: req.body.dates,
    datesSelected: req.body.datesSelected,
    selectDate: req.body.selectDate,
    createdAt: req.body.createdAt,
    updatedAt: req.body.updatedAt,
    host: req.body.host,
    participants: req.body.participants,
    participantsList: req.body.participantsList,
    feedbackParticipant: req.body.feedbackParticipant,
    feedbacksList: req.body.feedbacksList,
    agenda: req.body.agenda,
    minutes: req.body.minutes

  };
  db_connect.collection("meetings").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });


// All Meetings
// This section will help you get a list of all the meetings.
recordRoutes.route("/meeting").get(function (req, res) {
 let db_connect = dbo.getDb("liaisonusers");
 db_connect
   .collection("meetings")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});


// Proposed Meetings
// This section will help you get a list of all the proposed meetings.
recordRoutes.route("/meeting/proposed").get(function (req, res) {
  let db_connect = dbo.getDb("liaisonusers");
  db_connect
    .collection("meetings")
    .find({status: "Proposed"})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });


// Confirmed Meetings 
// This section will help you get a list of all the meetings.
recordRoutes.route("/meeting/confirmed").get(function (req, res) {
  let db_connect = dbo.getDb("liaisonusers");
  db_connect
    .collection("meetings")
    .find({status: "Confirmed"})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });


 

// Edit button
// This section will help you get a single meeting by id
recordRoutes.route("/meeting/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("meetings")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });  



//Proposed Meetings
// This section will help you update a meeting by id.
recordRoutes.route("/update/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
      id: req.body.id,
      title: req.body.title,
      description: req.body.description,
      start_time: req.body.start_time,
      duration: req.body.duration,
      status: req.body.status,
      location: req.body.location,
      password: req.body.password,
      dates: req.body.dates,
      datesSelected: req.body.datesSelected,
      selectDate: req.body.selectDate,
      createdAt: req.body.createdAt,
      updatedAt: req.body.updatedAt,
      host: req.body.host,
      participants: req.body.participants,
      participantsList: req.body.participantsList,
      feedbackParticipant: req.body.feedbackParticipant,
      feedbacksList: req.body.feedbacksList,
      agenda: req.body.agenda,
      minutes: req.body.minutes
    },
  };
  db_connect
    .collection("meetings")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 meeting updated");
      response.json(res);
    });
 });




// This section will help you delete a meeting
recordRoutes.route("/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("meetings").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 meeting deleted");
    response.json(obj);
  });
 }); 



// interface
// This section will help you get a single User by id
recordRoutes.route("/record/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });   


 // usersList
// This section will help you get a list of all the users.
recordRoutes.route("/user").get(function (req, res) {
  let db_connect = dbo.getDb("liaisonusers");
  db_connect
    .collection("records")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });



// This section will help you get a single user by id
recordRoutes.route("/user/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("records")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });  



 
module.exports = recordRoutes;