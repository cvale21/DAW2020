var express = require('express');
var router = express.Router();

var Student = require('../controllers/student')

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/students', function(req, res) {
    // Data Retrieve 
    //promessa
    Student.list()
        .then(data => res.render('students', { list: data}))
        .catch(err => res.render('error', {error: err}));
  });

// Get Student
router.get(/\/students\/A|PG[0-9]+$/, function(req, res) {
    var id = req.url.split("/")[2]
    Student.lookup(id)
      .then(data => res.render('student',{student: data}))
      .catch(err => res.render('error',{error: err}))
  });


//Get Registry Form
router.get('/students/register', function(req, res) {
    res.render('register', { title: "Register New Student" })
});

// POST - Student
router.post('/students', function(req, res) {

    var info = req.body
    info.tpc = process_TPC(info)

    console.log(info);
    Student.insert(info)
      .then(data => res.render('student',{student: data}))
      .catch(err => res.render('error',{error: err}))
  });


//Get Student Edit Form
router.get(/\/students\/edit\/A|PG[0-9]+$/, function(req, res) {
    var id = req.url.split("/")[3]

    Student.lookup(id)
      .then(data => res.render('edit',{student: data}))
      .catch(err => res.render('error',{error: err}))
  });


//Update Student

router.post('/students/edit', function(req, res) {

    var info = req.body

    info.tpc = process_TPC(info)

    console.log(info)
    
    Student.edit(info)
      .then(data => res.render('student',{student: data}))
      .catch(err => res.render('error',{error: err}))
  });


// Delete Student
router.get(/\/students\/delete\/A|PG[0-9]+$/, function(req, res) {

    var id = req.url.split("/")[3]

    Student.remove(id)
      .then(data => {
          Student.list()
          .then(data => res.render('students', { list: data}))
          .catch(err => res.render('error', {error: err}));
      })   
      .catch(err => res.render('error', {error: err}))
  });


module.exports = router;

function process_TPC(info){

    tpc = []

    tpc.lenght = 8
        
        if(info.tpc1 == "on"){
            tpc[0] = 1;
        }else{
            tpc[0] = 0;
        }
        
        if(info.tpc2 == "on"){
            tpc[1] = 1;
        }else{
            tpc[1] = 0;
        }
        
        
        if(info.tpc3 == "on"){
            tpc[2] = 1;
        }else{
            tpc[2] = 0;
        }
        
        if(info.tpc4 == "on"){
            tpc[3] = 1;
        }else{
            tpc[3] = 0;
        }

        if(info.tpc5 == "on"){
            tpc[4] = 1;
        }else{
            tpc[4] = 0;
        }

        if(info.tpc6 == "on"){
            tpc[5] = 1;
        }else{
            tpc[5] = 0;
        }

        if(info.tpc7 == "on"){
            tpc[6] = 1;
        }else{
            tpc[6] = 0;
        }

        if(info.tpc8 == "on"){
            tpc[7] = 1;
        }else{
            tpc[7] = 0;
        }

    return tpc

}