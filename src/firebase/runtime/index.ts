// Communication with foundry-firebase-runtime

// foundry-runtime-firebase is running a server on port XXXX that expects
// info about function defintions

import * as http from 'http';

export enum FunctionType {
  Https = "https",
  HttpsCallable = "httpsCallable",
  Auth = "auth",
  Firestore = "firestore",
  RealtimeDB = "realtimeDb",
}

function send(payload: any): Promise<any> {
  return new Promise((resolve, reject) => {
    const data = JSON.stringify(payload);

    // An object of options to indicate where to post to
    const opts = {
      host: 'localhost',
      port: '8090',
      path: '/',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': data.length,
      },
    };

    const req = http.request(opts, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);


      res.setEncoding('utf8');

      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
        return resolve();
      });
    });

    req.on('error', (error) => {
      console.error(error);
      return reject(error);
    });

    req.write(data);
    req.end();
  });
}

export async function registerHttpsFunction(name: string, type: FunctionType) {
  await send({
    functions: {
      name,
      type,
    }
  });
}

export async function sendHttpsInfo(name: string, method: string, route: string, payload: Object) {
  await send({
    functions: {
      name,
      method,
      route,
      payload,
    }
  });
}
