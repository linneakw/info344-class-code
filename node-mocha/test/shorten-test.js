'use strict';

//should assertion library
//see https://shouldjs.github.io/
//for documentation
var should = require('should');

//our shorten module
var shorten = require('../lib/shorten');

//BDD write tests first, to test code
// take every requirement listed, and write a test for each one of those requirements
describe('shorten module', function() {
   it('should encode an id to a path', function() {
      var enc = shorten.encode(99999);
      should.exist(enc);
      // test enc variable, tests if not null 
      enc.length.should.be.above(0);
   });
   
   it('should decode a path back to the same id', function() {
       var id = 99999;
       shorten.decode(shorten.encode(id)).should.equal(id);
   });
});

/*
describe('shorten', function() {
    it('must encode an id', function() {
        var enc = shorten.encode(999);
        should.exist(enc);
        enc.length.should.be.above(0);
    });
    
    it('must decode back to the same id', function() {
        shorten.decode(shorten.encode(999)).should.equal(999);        
    });
    
    it('encodings must be unique', function() {
        var id;
        var enc;
        var encodings = {};
        for (id = 0; id < 1000; id++) {
            enc = shorten.encode(id);
            encodings.hasOwnProperty(enc).should.be.false;
            encodings[enc] = 1;
        }
    });
});*/
