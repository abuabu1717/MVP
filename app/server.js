//database
var config = require('./herokuconfig.json')
var mongoose = require('mongoose');
var db = mongoose.connection;

mongoose.connect(config.mongodbConStr, {
  useMongoClient: true
});

db.on('error', function() {
  console.log('Mongoose connection error');
});

db.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.mongodbConStr);
});

db.on('disconnected', function () {
  console.log('Mongoose default connection disconnected');
});

process.on('SIGINT', function() {
  db.close(function () {
    console.log('Mongoose default connection disconnected through app termination');
    process.exit(0);
  });
});


var itemSchema = mongoose.Schema({
  name: String,
  address: {type: String, required: true, unique: true},
  likes: Number
});

var Item = mongoose.model('Item', itemSchema);

//server

var express = require('express');
var bodyParser = require('body-parser');
var google = require('./google.js')

var app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.post('/parks/import', function (req, res) {
  console.log(`\nSearching for: ${req.body.term}`);
  google.searchPlaces(req.body.term, res);


  //need to query mongoose to merge likes data into
});

app.post('/parks/updatedb', function (req, res) {
  let data = req.body;
  console.log(data);
  var newpark = new Item({
    name: data.name,
    address: data.address,
    likes: data.likes
  });

  Item.findOneAndUpdate(
    {address: data.address},
    {likes: data.likes, name: data.name},
    {upsert:true, new:true},
    function (err, res) {
      if (err) {
        throw err;
      }
    }
  );
  res.send(); //terminate connection
});

app.get('/parks', function (req, res) {
  console.log('GET parks');
  //res.send('root');
});

app.get('/', function (req, res) {
  res.send('root');
  console.log('GET homepage');

});

app.get('/test', function (req, res) {
  res.send('test');
  console.log('Get database');
});

//process.env.PORT is a way for heroku to pass a port.  On every deploy the port will change.
// || means OR.. if there's no value being passed there it defaults to 5000 (i.e., localhost development)
app.listen(5000, function() {
  console.log('App started on port 5000' );
});

/*
app.listen(process.env.PORT || 5000, function() {
  console.log('App started on port ' + process.env.PORT || 5000);
});
*/




