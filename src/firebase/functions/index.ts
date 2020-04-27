
// import * as runtime from '../runtime';
// import { CloudFunction, HttpsFunction } from 'firebase-functions';



// export interface HttpsConfig {
//   name: string,
//   method: HttpsMethod,
//   route: string,
//   payload: Object, // or any?
// }


// export function addCloudFunction(fn: CloudFunction<any>, name: string) {
//   runtime.register(fn, name);
// }

// export function addHttpsFunction(fn: HttpsFunction, name: string) {
//   runtime.register(fn, name);
// }


import https from './https';
import httpsCallable from './httpsCallable';
import auth from './auth';

export {
  https,
  httpsCallable,
  auth,
};

