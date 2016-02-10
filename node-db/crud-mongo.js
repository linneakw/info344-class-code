'use strict';

var mongoose = require('mongoose');
var dbConfig = require('./secret/config-mongo.json');

var storySchema = new mongoose.Schema({
    url: String, 
    votes: {type: Number, default: 0},
    createdOn: {type: Date, default: Date.now} 
});

// acts like constructor
// param name of name of databse collection in which documents will be saved
// mongo has dbs, within a db they have 1 or more collections, like tables
// roughly the same shape, each doc can have diffrnt shapes
// add more and more crap to an object, doesn't care about schema
// second param, mongoose schema use for story documents
var Story = mongoose.model('Story', storySchema);
// reference to the model
// can ue new Story(), or find, update stories, etc

mongoose.connect(dbConfig.url);
mongoose.connection.on('error', function(err) {
    console.error(err);
});
// live connection, raises events

// Otherwise, insert docs!
 var newStory = {
     url: 'http://www.google.com'
 };
 
 var id;
 
 Story.create(newStory)
    .then(function(story) {
        id = story._id;
        console.log('inserted new story!');
        console.log(story);
    })
    .then(function() {
        // exec actually execute the query returned
        return Story.findById(id).exec();
    })
    .then(function(story) {
        console.log('found story!');
        console.log(story);
        // doesn't drag whole thing down, but updates object
        // param 1: id you want ot update
        // param 2: instructions on what to do, object
        // inc = increment votes by 1
        // new: true returns updated version of the object
        return Story.findByIdAndUpdate(id, {$inc: {votes: 1}}, {new: true});
    })
    .then(function(story) {
        console.log('updated story!');
        console.log(story);
        
        return Story.findByIdAndRemove(id);
    })
    .then(function() {
        console.log('story deleted'); 
    })
    .then(null, function(err) {
        // don't support .catch, use this instead
        console.error(err);
    })
    .then(function() {
        mongoose.connection.close();
    });
    