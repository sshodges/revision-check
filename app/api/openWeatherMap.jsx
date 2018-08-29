var axios = require('axios');

const OPEN_WEATHER_MAP_URL = 'https://api.openweathermap.org/data/2.5/weather?appid=91158b07cafe129459dda2605d620499&units=metric';

module.exports = {
  getTemp: function(location){
    var encodedLocation = encodeURIComponent(location)
    var requestUrl = `${OPEN_WEATHER_MAP_URL}&q=${encodedLocation}`;

    return axios.get(requestUrl).then(function(res){
      if (res.data.cod && res.data.message) {
        throw new Error(res.data.message);
      } else {
        return {
          temp: res.data.main.temp,
          location: `${res.data.name}, ${res.data.sys.country}`
        }
      }
    }, function (err) {
      throw new Error('Unable to find weather for that location')
    });
  },
  login: function (obj) {
    return axios.post('/api/users/login', obj)
    .then(function (response) {
      console.log('Logged In');
      localStorage.setItem('token', response.headers.auth);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  register: function () {
    return axios.post('/api/users', {
      email: 'fred@fred.com',
      password: 'Flintstone12'
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  getDocuments: function (parent) {
    return axios.get('/api/documents/'+parent, {
      headers: {
        "Auth" : localStorage.getItem('token')
      }
    })
    .then(function (response) {
      return(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  },
  postDocuments: function(obj){
    console.log(localStorage.getItem('token'));
    return axios.post('/api/documents', obj, {
      headers: {
        "Auth" : localStorage.getItem('token')
      }
    })
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });
  }
}
