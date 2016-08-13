var AngularJS = require('angular');

var PouchDB = require('pouchdb');
var dbpos = 'refdb';
var db = PouchDB(dbpos);
var remoteCouch = false;

var refApp = AngularJS.module('refApp', []);
console.log("hello, world")
refApp.controller('RefController', function() {
  var refCtl = this;
  refCtl.add = function(value) {
    //value._id;
    console.log("adding a reference");
    console.log(value);
    db.put(value, function callback(err, result) {
      if (!err) console.log('Successfully added a reference');
    });
  };
});


function addTodo(text) {
  var todo = {
    _id: new Date().toISOString(),
    title: text,
    completed: false
  };
  db.put(todo, function callback(err, result) {
    if (!err) {
      console.log('Successfully posted a todo!');
    }
  });
}

//addTodo("def");
db.allDocs({include_docs: true, descending: true}, function(err, doc) {
  doc.rows.forEach(function(todo){
    console.log(todo.doc.title);
  });
});
