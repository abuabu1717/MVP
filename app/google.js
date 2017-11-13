var config = require('./herokuconfig.json')
var NodeGeocoder = require('node-geocoder');
var request = require('request');
API_KEY = config.google_apikey;

var options = {
  provider: 'google',
  httpAdapter: 'https',
  apiKey: API_KEY,
  formatter: null
};

exports.searchPlaces = (term, res) => {
  var geocoder = NodeGeocoder(options);
  geocoder.geocode(term, (res) => {
    return res;
  })
  .then((data) => {
    return data;
  })
  .then((data) => {
    searchGoogleRadar(data, res);
  })
  .catch((err) => {
    console.log(err.message);
  });
}

var searchGoogleRadar = (geoData, res) => {
  let city = geoData[0].city;
  let state = geoData[0].administrativeLevels.level1short;
  let zip = geoData[0].zipcode;
  let country = geoData[0].countryCode;
  let loc = `${city}, ${state} ${zip} ${country}`;
  let latitude = geoData[0].latitude;
  let longitude = geoData[0].longitude;
  let radius = 4023;

  let google_places_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=' + `${latitude},${longitude}&radius=${radius}&type=park&key=${API_KEY}`;


  request(google_places_url, (error, response, body) => {
    let data = JSON.parse(body);
    for (var i = 0; i < data.results.length; i++) {
      data.results[i].loc = loc;
    }
    res.send(data.results);
  });
}



