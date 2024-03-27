//import fetchMyIp file
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIp } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');

// setting our Ip address fetching function

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }

//   console.log('It worked! Returned IP:' , ip);
// });

//fetching fetchCoordsByIp function

// fetchCoordsByIp("2607:fea8:a4c7:8900:604e:ab49:e11e:1e9", (error, coordinates) => {
// if(error) {
//   console.log ("It didn't work!", error);
//   return;
// }
// console.log("It worked! Returned coordinates:", coordinates)
// })
fetchISSFlyOverTimes({ latitude: 43.653226, longitude: -79.3831843 }, (error, passTimes) => {
if(error) {
  console.log ("It didn't work!", error);
  return;
}
console.log("It worked! Returned flyover times:", passTimes);
})


