'use strict';

var mysql = require('mysql');
// generically can turn any interface into a promise based interface
var bluebird = require('bluebird');

//load connection info
// . at path means node can't tell module verus local file, 
// . means local file, not module
var dbConfig = require('./secret/config-maria.json');

// error argument as first arg, second as next
// callback function convention
var conn = bluebird.promisifyAll(mysql.createConnection(dbConfig));
// id of newly inserted row
var id;

function logRow(row) {
    console.log(row);
}

function logRows(rows) {
    rows.forEach(logRow);
}

// does same thing as original, but returns a promise instead 
// of accepting callback
conn.queryAsync('insert into stories (url) values (?)', ['http://google.com'])
    .then(function(results) { 
        console.log('row inserted, new id = %s', results.insertId);
        id = results.insertId;
        return conn.queryAsync('select * from stories where id=?', [results.insertId]);
    }).then(logRows)
    .then(function() {
        return conn.queryAsync('update stories set votes=votes+1 where id=?', [id]);
    }).then(function(results) {
        console.log('%d row affected', results.affectedRows);
        return conn.queryAsync('select * from stories where id=?', [id]);
    }).then(logRows)
    .then(function() {
        return conn.queryAsync('delete from stories where id = ?', [id]);
    }).then(function(results) {
        console.log('%d rows afffected', results.affectedRows);
    })
    .then(function() {
        conn.end();
    }).catch(function(err) {
        console.error(err);
        conn.end();
    });

/*
// execute any sql statement
conn.query('select * from stories', function(err, rows) {
    if (err) {
        console.error(err);
    } else {
        console.log('%d rows returned', rows.length);
        rows.forEach(function(row) {
            console.log(row);
        });
    }
    
    conn.end();
});
*/