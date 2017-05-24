var mongoose = require('mongoose');
var Campground = require('./models/campground');
var Comment = require('./models/comment');

var data = [
  {
    name: "Cloud's Rest",
    image: "https://farm4.staticflickr.com/3191/3061337059_36c9457ab6.jpg",
    description: "Blah blah blah"
  },
  {
    name: "The Devil's Butthole",
    image: "https://farm5.staticflickr.com/4026/4504027757_3ffdbe1efa.jpg",
    description: "This place is rly hot. 1/7"
  },
  {
    name: "Desert Mesa",
    image: "https://farm3.staticflickr.com/2924/14465824873_026aa469d7.jpg",
    description: "Too many black people for my taste"
  }
];

function seedDB() {
  // Remove all campgrounds
  Campground.remove({}, function(err) {
    if(err) {
      console.log(err);
    } else {
      console.log("Removed campgrounds");
      // Add a few campgrounds
      data.forEach(function(seed) {
        Campground.create(seed, function(err, campground) {
          if(err) {
            console.log(err);
          } else {
            console.log("added a campground");
            Comment.create({
              text: "This place is gr8 but i wish there was internet",
              author: "Homer"
            }, function(err, comment) {
              if(err) {
                console.log(err);
              } else {
                campground.comments.push(comment);
                campground.save();
                console.log('created new comment');
              }
            });
          }
        });
      });
    }
  });
  // Add a few comments
}

module.exports = seedDB;
