var AngularJS = require('angular');

var PouchDB = require('pouchdb');
var dbpos = 'refdb';
var db = PouchDB(dbpos);
var remoteCouch = false;

var refApp = AngularJS.module('refApp', []);
console.log("hello, world")
refApp.controller('RefController', function($scope) {
  var refCtl = this;
  db.allDocs({include_docs: true, descending: true}).then(function (docs) {
    $scope.refs = [];
    docs.rows.forEach(function(row) {
      $scope.refs.push(row.doc);
    });
    $scope.$apply();
    console.log($scope.refs);
  }).catch(function (err) {
    console.log("Failed to get all docs");
    console.log(err);
  });
  refCtl.add = function(value) {
    //value._id;
    console.log("adding a reference");
    console.log(value);
    db.put(value, function callback(err, result) {
      if (!err) console.log('Successfully added a reference');
    });
  };
});

db.allDocs({include_docs: true, descending: true}, function(err, doc) {
  doc.rows.forEach(function(todo){
    console.log(todo.doc.title);
  });
});
