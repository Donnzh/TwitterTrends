# Twitter Trends 
##### Demo: https://twittertrends.github.io/
a react redux project 

![](https://github.com/Donnzh/TwitterTrends/blob/master/src/common/Images/readmeImage2.png)


* Curenlty showing trends across 5 cities in Australia and New Zealand.
* Auto update most porpular trends every 15 mins.
* Highly scalable markers.
* Using `react redux start kit` boilerplate.
* backend server avalible at repo: TwitterTrends-backend

Todos:

* tweets panel, search input

##### Run in a local env:

add a `config.js` file in sever folder with your twitter auth info. as show below.
 then `yarn install & start`

```

const config = {
  twitter: {
    consumer_key : 'YOUR CONSUMER KEY',
    consumer_secret : 'YOUR CONSUMER SECRET',
    access_token : 'YOUR ACCESS TOKEN',
    access_token_secret : 'YOUR ACCESS TOKEN SECRET'
  }
};

module.exports = config;



```
