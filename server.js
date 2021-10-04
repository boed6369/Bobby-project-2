require('dotenv').config()

const { render } = require('ejs');
const { request, response } = require('express');
//___________________
//Dependencies
//___________________
const express = require('express');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const unit = require('./models/unit');
const app = express();
const db = mongoose.connection;
const units = require('./models/unit.js')
//____________________
// Allow use of Heroku's port or your own local port, depending on the environment
const PORT = process.env.PORT || 3000;

//___________________
//Database
//___________________
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.DATABASE_URL;

// Connect to Mongo &
// Fix Depreciation Warnings from Mongoose
// May or may not need these depending on your Mongoose version
mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }
);

// Error / success
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongod connected '));
db.on('disconnected', () => console.log('mongod disconnected'));

//___________________
//Middleware
//use public folder for static assets
app.use(express.static('public'));

// populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form


//___________________
// Routes
//index
app.get('/unit', (request, response) => {
  units.find({}, (error, allUnits) =>
    response.render('index.ejs', {
      unit: allUnits
    }))
})
// new
app.get('/unit/new', (request, response) => {
  response.render('new.ejs')
})
// delete
app.delete('/unit/:id', (request, response) => {
  units.findByIdAndRemove(request.params.id, (error, foundUnit) => {
      response.redirect('/unit');
  });
});
// update
app.put('/unit/:id', (request,response) => {
  units.findByIdAndUpdate(request.params.id, request.body, {
    new:true 
  }, (error, updatedUnit) => {
    response.redirect(`/unit`)
  })
})

// create
app.post('/unit', (request, response) => {
  units.create(request.body, (error, createdUnit) => {
    response.redirect('/unit')
  })

})
// edit
app.get('/unit/:id/edit', (request,response) => {
  units.findById(request.params.id, (error,foundUnit) => {
    response.render('edit.ejs', { 
      unit:foundUnit
    })
  })

})
// show
app.get('/unit/:id', (request, response) => {
	units.findById(request.params.id, (err, foundUnit) => {
		response.render('show.ejs', {
			unit: foundUnit,
		});
	});
});


// 
//localhost:3000
// app.get('/' , (req, res) => {
//   res.send('Hello World!');
// });

//___________________
//Listener
//___________________
app.listen(PORT, () => console.log('express is listening on:', PORT));
