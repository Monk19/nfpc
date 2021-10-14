var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');

var app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', indexRouter);

// app.use('/users', usersRouter);

// db connection
const sqlite3 = require("sqlite3");
const db = new sqlite3.Database("./db/nfpcdb.db", (err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to db");
});
const port = process.env.PORT || 5000;
app.post('/Login', function (req, res) {
  // db.get('SELECT * FROM Userlogin where email=? and password=?', [req.body.email,req.body.pwd], function(err, rows){
  //     rows.findOne(function (rows) {
  //        if (row.Email == req.body.email && row.Password==req.body.pwd){
  //        console.log("user exits")}
       
  //        //go to success page

  //        else
  //        {  console.log("user not exits")}
       //list error

       if (req.body.email,req.body.pwd){
        db.get('SELECT * FROM Userlogins where EmailID=? and Password=?', [req.body.email,req.body.pwd], function(err, rows){
               if(rows){
                 console.log("login sucessfull")
               }
               else {console.log("login failed")}
              })
       }
       else {console.log("enter the fields")}
      
      res.send();
  });
// console.log(req.body.email+"This is Emial")

// res.send(req)



app.listen(5000, () => {
  console.log("Server is sucessfully established");
});

// catch 404 and forward to error handler

app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });


// db.serialize(function() {
        
//   db.run("CREATE TABLE Accounts (id INTEGER, username TEXT, password TEXT, fullname TEXT");

//   db.run(`INSERT INTO Accounts VALUES (1, "bob", "password", "Bob Bobson")`);       
//   });

// db.close();



module.exports = app;






// // Import dependencies
// const express = require('express')
// const bodyParser = require('body-parser')
// const compression = require('compression')
// const cors = require('cors')
// const helmet = require('helmet')

// // Import routes
// const loginRouter = require('./routes/login')

// // Set default port for express app
// const PORT = process.env.PORT || 4001

// // Create express app
// const app = express()

// // Apply middleware
// // Note: Keep this at the top, above routes
// app.use(cors())
// app.use(helmet())
// app.use(compression())
// app.use(bodyParser.urlencoded({ extended: false }))
// app.use(bodyParser.json())

// // Implement books route
// app.use('/login', loginRouter)

// // Implement 500 error route
// app.use(function (err, req, res, next) {
//   console.error(err.stack)
//   res.status(500).send('Something is broken.')
// })

// // Implement 404 error route
// app.use(function (req, res, next) {
//   res.status(404).send('Sorry we could not find that.')
// })

// // Start express app
// app.listen(PORT, function() {
//   console.log(`Server is running on: ${PORT}`)

