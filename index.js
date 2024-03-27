//import fetchMyIp file
const { fetchMyIP } = require('./iss');
// setting our Ip address fetching function

fetchMyIP((error, ip) => {
  if (error) {
    console.log("It didn't work!" , error);
    return;
  }

  console.log('It worked! Returned IP:' , ip);
});


