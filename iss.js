const request = require("request");
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
         // fetchMyIp function
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function (callback) { 
  // use request to fetch IP address from JSON API
  
  request("https://api6.ipify.org?format=json",(error,response,body) => {
    if (error) {
      callback(error, null);
      return
    } 

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response:${body}`;
      callback(Error(msg), null);
      return;
    }

     
      const ip = JSON.parse(body).ip;
      callback(null,ip);
    

  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
             //fetchCoordsByIp function
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const fetchCoordsByIp = function (ip,callback) {

  // using request to fetch coordinates of an Ip address
  
  const url = `http://ipwho.is/${ip}`

  request(`${url}`,(error,response,body) => {
    if (error) {
      callback(error, null);
      return
    }
    
    const data = JSON.parse(body);
       if (!data.success){
        const message = `Success status was ${data.success}. Server message says: ${data.message} when fetching for IP ${data.ip}`; 
        callback(Error(message), null);
        return;
       }

    const {latitude, longitude }= data ;
   
    callback(null, {latitude, longitude});

  });
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
               //fetchISSFlyOverTimes function
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//use request api to retun a list of upcoming ISS passes

const fetchISSFlyOverTimes = function (coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`
    
  
  request(url, (error,response,body) => {
    if (error) {
      callback(error,null);
      return;
    }

    if (response.statusCode !== 200) {
      callback(Error(`Status code ${response.statusCode} when fetching ISS pass times: ${body}`),null);
      return;
    }
    const passes = JSON.parse(body).response;
    callback(null,passes)




    })
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////



//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
             // nextISSTimesForMyLocation function
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if(error) {
      return callback(error, null);
    }

    fetchCoordsByIp(ip,(error,loc) => {
      if(error) {
        return callback(error, null);
      }

      fetchISSFlyOverTimes(loc, (error, nextPasses) => {
        if(error) {
          return callback(error,null);
        }
        callback(null, nextPasses);
      })

    });

  });


}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////




module.exports = { fetchMyIP,
                   fetchCoordsByIp,
                   fetchISSFlyOverTimes,
                   nextISSTimesForMyLocation };

