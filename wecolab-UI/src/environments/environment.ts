// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  chatServiceURL: 'http://13.126.147.254:8086/',
  presentationServiceURL: 'http://13.126.147.254:8087/',
  roomServiceURL: 'http://13.126.147.254:8085/',
  roomAddressServiceURL: 'http://13.126.147.254:8185/',
  presentationAddressServiceURL: 'http://13.126.147.254:8187/',
  userServiceURL: 'http://13.126.147.254:8081/',

  // presentationServiceURL: 'http://172.23.234.56:8087/',
  // roomServiceURL: 'http://172.23.234.56:8085/',
  
  emailNotificationServiceURL: 'http://13.126.147.254:8090/',
  paymentServiceURL: 'http://13.126.147.254:8200/'
}; 

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
