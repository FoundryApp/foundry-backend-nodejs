import * as http from 'http';

let config: any[] = [];

export enum FunctionType {
  Https = "https",
  HttpsCallable = "httpsCallable",
  Auth = "auth",
  Firestore = "firestore",
  RealtimeDB = "realtimeDb",
}

export function send(payload: any) {
  config.push(payload);
}

export function getConfig() {
  return config;
}

export function clearConfig() {
  config = [];
}

// export function send(payload: any): Promise<any> {
//   return new Promise((resolve, reject) => {
//     const data = JSON.stringify(payload);

//     // An object of options to indicate where to post to
//     const opts = {
//       host: 'localhost',
//       port: '8090',
//       path: '/',
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Content-Length': data.length,
//       },
//     };

//     const req = http.request(opts, (res: any) => {
//       // console.log(`STATUS: ${res.statusCode}`);
//       // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);


//       res.setEncoding('utf8');

//       res.on('data', () => {
//         // TODO: ?        
//       });
//       res.on('end', () => {
//         return resolve();
//       });
//     });

//     req.on('error', (error: any) => {
//       console.error(error);
//       return reject(error);
//     });

//     req.write(data);
//     req.end();
//   });
// }