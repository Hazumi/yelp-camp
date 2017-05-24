var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');
var app = express();

mongoose.connect('mongodb://localhost/yelp_camp');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
app.use(methodOverride('_method'));

// schema setup
var Schema = mongoose.Schema;
var campgroundSchema = new Schema({
  name: String,
  image: String
});
var Campground = mongoose.model("Campground", campgroundSchema);

// Campground.create({
//     name: "Buttcrack Mtn",
//     image: "https://farm5.staticflickr.com/4137/4812576807_8ba9255f38.jpg"
// }, function(err, campground) {
//   if(err) {
//     console.log(err);
//   } else {
//     console.log("yay");
//     console.log(campground);
//   }
// });

app.get('/', function(req, res) {
  res.render('landing');
});

app.get('/campgrounds', function(req, res) {
  Campground.find({}, function(err, campgrounds) {
    if(err) {
      console.log(err);
    } else {
      res.render('campgrounds', {campgrounds: campgrounds});
    }
  });
});

app.get('/campgrounds/new', function(req, res) {
  res.render('new');
});

app.post('/campgrounds', function(req, res) {
  var name = req.body.name;
  var image = req.body.image;
  var newCampground = {name: name, image: image};
  Campground.create(newCampground, function(err, campground) {
    if(err) {
      console.log(err);
    } else {
      res.redirect('/campgrounds');
    }
  });
});

app.listen(3000, function() {
  console.log('listening..');
});
