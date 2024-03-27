//import fetchMyIp file
const { fetchMyIP } = require('./iss');
const { fetchCoordsByIp } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss');

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
const printPassTimes = function(passTimes){
  for (const pass of passTimes) {
    const datetime = new Date(0);
    datetime.setUTCSeconds(pass.risetime);
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`);
  }
}
nextISSTimesForMyLocation( (error, passTimes) => {
//if failed , print error
if(error) {
  return console.log ("It didn't work!", error);
  
}
//if success, print this out
printPassTimes(passTimes);
})


