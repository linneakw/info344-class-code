'use strict';

//Mongoose is a library that sits on top of the native MongoDB driver
//providing schema validation and a few other things that you normally
//get with a relational database
var mongoose = require('mongoose');

//load the configuration info: we only need a `url` property
//with the MongoDB URL
var dbConfig = require('./secret/config-mongo.json');

//declare a new schema for our Story objects
//each story will have a url, number of votes, and a createdOn date
//all MongoDB objects also get an _id property with a database-assigned
//unique key, so you don't have to declare that yourself
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

//create the model based on this schema
//this is like a class that you can use to create
//new story instances, or you can use static methods
//on it to insert, find, update, and delete directly 
var Story = mongoose.model('Story', storySchema);
// reference to the model
// can ue new Story(), or find, update stories, etc

mongoose.connect(dbConfig.url);
mongoose.connection.on('error', function(err) {
    console.error(err);
});
// live connection, raises events

// Otherwise, insert docs!
//a new story object
//default values for votes and createdOn
//will be automatically applied by mongoose
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

        //update the story by incrementing the votes value
        //the $inc tells Mongo to increment the votes property
        //which allows multiple users to do this all at the same
        //time with everyone's votes being counted
        //the {new: true} tells Mongo to return th updated version
        //of the document so that we can see the updated votes value
        return Story.findByIdAndUpdate(id, {$inc: {votes: 1}}, {new: true});
    })
    .then(function(story) {
        console.log('updated story!');
        console.log(story);
        
        //this removes the document from the database and returns
        //the document as it was before it was deleted
        //use .remove() to just remove it without returning it
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
