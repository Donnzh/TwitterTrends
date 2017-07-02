const Twit = require('twit');
const keys = require('./config');

const T = new Twit({
  consumer_key:         keys.twitter.consumer_key,
  consumer_secret:      keys.twitter.consumer_secret,
  access_token:         keys.twitter.access_token,
  access_token_secret:  keys.twitter.access_token_secret,
  timeout_ms:           60*1000,  // optional HTTP request timeout to apply to all requests.
});

// setup city/country's trends, only woeid that supported by twitter api
const citiesWoeids = [1105779, 1103816, 1100661, 1098081, 1099805, 23424916];
const trendsData = [];

function getTrendsData() {
  trendsData.length = 0;
  citiesWoeids.forEach((woeid) => {
    T.get('trends/place', { id: woeid }, (err, data, response) => {
      if (err) {
        console.error('err when request twitter api', err, 'woeid', woeid);
      }
      trendsData.push(data[0]);
    });
  });
  return trendsData;
}

module.exports = {
  getTrendsData
};
