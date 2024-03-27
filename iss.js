const request = require("request");

/**
 * Makes a single API request to retrieve the user's IP address.
 * Input:
 *   - A callback (to pass back an error or the IP string)
 * Returns (via Callback):
 *   - An error, if any (nullable)
 *   - The IP address as a string (null if error). Example: "162.245.144.188"
 */
const fetchMyIP = function(callback) { 
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


module.exports = { fetchMyIP,
                   fetchCoordsByIp };

