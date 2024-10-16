import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

var customerToken = AsyncStorage.getItem('customerToken');

const instance = axios.create({

  // baseURL: "https://webapi.hoppapp.com/",

  //baseURL: "https://api.hoppapp.com/",
  baseURL: "https://hoppappapi.revalweb.com/",
  
  headers: {
    "Content-Type": "application/json",
  }
});

instance.interceptors.request.use(async (config) => {
 
if(config.url == 'api/VerifyMobile'){
  return config;
}
else if(config.url == 'api/VerifyOTP'){
    return config;
}
else if(customerToken != '' && customerToken != undefined){
  let token =await AsyncStorage.getItem('customerToken')
  config.headers.authorization = 'Bearer ' + token;
  return config;
}

}, (error) => {
  console.log('error in helper module----',error)
  return Promise.reject(error);
});

export default {
     getData: (actionUrl) => instance({
       method: "GET",
       url: actionUrl,
       transformResponse: [function (data) {
         const json = JSON.parse(data)
        // if (json.ReturnCode == 108) {
    //       AsyncStorage.removeItem('BasketGuid');
    //       AsyncStorage.removeItem('CartCount');
    //       // AsyncStorage.removeItem('CountryId');
    //       AsyncStorage.removeItem('CustomerStatusId');
    //       AsyncStorage.removeItem('CustomerToken');
    //       AsyncStorage.removeItem('CustomerUniqueId');
    //       AsyncStorage.removeItem('UserEmail');
    //       AsyncStorage.removeItem('FirstName');
    //       AsyncStorage.removeItem('IsExistingCustomer');
    //       this.props.navigation.navigate('Home');
        // }
    //     if (json.ReturnCode == 12) {
    //       AsyncStorage.removeItem('JwtToken');
    //     }
         return json;
       }]
     }).catch(function (error) {
       if (error.response) {
    //     // The request was made and the server responded with a status code
    //     // that falls out of the range of 2xx
    //     console.log('200 status')
    //     console.log(error.response.data);
    //     console.log(error.response.status);
    //     console.log(error.response.headers);
  
       } else if (error.request) {
    //     // The request was made but no response was received
    //     // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
    //     // http.ClientRequest in node.js
         console.log(error.request);
       } else {
    //     // Something happened in setting up the request that triggered an Error
         console.log('Error', error.message);
       }
      console.log(error.config);
    }),
   
      postData: (actionUrl, requestData) => instance({
        method: "POST",
        url: actionUrl,
        data: requestData,        
        transformResponse: [function (data) {
          const json = JSON.parse(data)
         // if (json.ReturnCode == 108) {
            // AsyncStorage.removeItem('BasketGuid');
            // AsyncStorage.removeItem('CartCount');
            // AsyncStorage.removeItem('CountryId');
            // AsyncStorage.removeItem('CustomerStatusId');
            // AsyncStorage.removeItem('CustomerToken');
            // AsyncStorage.removeItem('CustomerUniqueId');
            // AsyncStorage.removeItem('UserEmail');
            // AsyncStorage.removeItem('FirstName');
            // AsyncStorage.removeItem('IsExistingCustomer');
            //this.props.navigation.navigate('Home');
          //}
        //   if (json.ReturnCode == 12) {
        //     AsyncStorage.removeItem('JwtToken');
        //   }
          return json;
        }]
      }).catch(function (error) {
        //console.log(error);
    })
  }
