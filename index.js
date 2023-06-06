const express = require('express')
const app = express()
const port = 3002
const bodyParser = require('body-parser');
const USERS = [];
let userMap = new Map();
const QUESTIONS = [{
    title: "Two states",
    description: "Given an array , return the maximum of the array?",
    testCases: [{
        input: "[1,2,3,4,5]",
        output: "5"
    }]
}];
const ADMIN_USER = "Mahesh";

const SUBMISSION = [
   
]
app.use(express.json());
app.use(bodyParser.json());
app.post('/signup', function(req, res) {
  console.log("yeyyy");
  const requestBody = req.body;
  if(!requestBody && !requestBody.email && !requestBody.password) {
    res.sendStatus(400);
  }
  // Check if the user with the given email exists in the USERS array
  if(USERS.includes(requestBody.email) && USERS.includes(requestBody.password)) {
    res.sendStatus(400);
  }
  USERS.push(requestBody.email);
  USERS.push(requestBody.password);
  userMap.set(requestBody.email, requestBody.password);
  console.log(USERS);
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({ data: `Hey ${requestBody.email} Your Sign up successful:`});
})

app.post('/login', function(req, res) {
  if(!req.body && !req.body.email && !req.body.password) {
    res.sendStatus(400);
  }
  if(USERS.includes(req.email)) {
    res.sendStatus(400);
  }
  console.log("password id" , userMap);
  if(userMap.get(req.body.email) !== req.body.password) {
    res.sendStatus(401);
  }
  res.setHeader('Content-Type', 'application/json');
  return res.status(200).json({ data: `Hey ${req.body.email} you have logged in successfully`});
})

app.get('/questions', function(req, res) {
  return res.status(200).json({ data: QUESTIONS});
})

app.get("/submissions", function(req, res) {
  return res.status(200).json({ data: SUBMISSION});
});


app.post("/submissions", function(req, res) {
  if(!req.body.submission) {
    return res.status(400).json({ data: "Input json should contain a submission field"});
  }
  SUBMISSION.push(req.body);
  return res.status(201).json({ data: "Question submitted successfully. Please Check submissions API for List of Submissions"});
});

app.post("/addQuestion", function(req, res) {
  if(req.body.user !== ADMIN_USER) {
    return res.status(401).json({ data: "Only Admin can add questions"});
  }
  if(!req.body.description ) {
    return res.status(400).json({ data: "Input json should contain a description field"});
  }
  delete req.body.user;
  QUESTIONS.push(req.body);
  return res.status(201).json({ data: "Question submitted successfully. Please Check questions API for List of Questions"});
});


app.listen(port, function() {
  console.log(`Leetcode backend app listening on port ${port}`)
})