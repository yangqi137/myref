var AngularJS = require('angular');

var PouchDB = require('pouchdb');
var dbpos = 'refdb';
var db = PouchDB(dbpos);
var remoteCouch = false;

var refApp = AngularJS.module('refApp', []);
console.log("New entry")
refApp.controller('RefController', function($scope) {
  var refCtl = this;
  refCtl.add = function(value) {
    //value._id;
    console.log("adding a reference");
    console.log(value);
    db.put(value, function callback(err, result) {
      if (!err) console.log('Successfully added a reference');
    });
  };
  refCtl.lookUpDOI = function(doi) {
    console.log('Looking up doi:' + doi);
  };
});
