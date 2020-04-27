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

    const req = http.request(opts, (res: any) => {
      // console.log(`STATUS: ${res.statusCode}`);
      // console.log(`HEADERS: ${JSON.stringify(res.headers)}`);


      res.setEncoding('utf8');

      res.on('data', () => {
        // TODO: ?        
      });
      res.on('end', () => {
        return resolve();
      });
    });

    req.on('error', (error: any) => {
      console.error(error);
      return reject(error);
    });

    req.write(data);
    req.end();
  });
}

///////////// Https function

export function registerHttps(name: string) {
  return send({
    functions: {
      name,
      type: FunctionType.Https,
    }
  });
}

export function sendHttpsInfo(name: string, method: string, route: string, payload: Object) {
  return send({
    functions: {
      name,
      method,
      route,
      payload,
    }
  });
}

///////////// HttpsCallable function

export function registerHttpsCallable(name: string) {
  return send({
    functions: {
      name,
      type: FunctionType.HttpsCallable,
    }
  });
}

export function sendHttpsCallableInfo(name: string, userId: string, payload: Object) {
  return send({
    functions: {
      name,
      userId,
      payload,
    }
  });
}

///////////// Auth function

export enum AuthTriggers {
  OnCreate = "onCreate",
  OnDelete = "onDelete",
}

export function registerAuth(name: string) {
  return send({
    functions: {
      name,
      type: FunctionType.Auth,
    }
  });
}

export function sendAuthCreateUserInfo(name: string, userId: string, data?: Object) {
  let obj;
  if (data) {
    obj = { id: userId, data }
  } else {
    obj = { getFromProd: { id: userId } }
  }

  return send({
    functions: {
      name,
      trigger: AuthTriggers.OnCreate,
      createUser: obj,
    },
  })
}

export function sendAuthDeleteUserInfo(name: string, userId: string) {
  return send({
    functions: {
      name,
      trigger: AuthTriggers.OnDelete,
      deleteUser: { id: userId },
    },
  });
}


///////////// Firestore function

export enum FirestoreTriggers {
  OnCreate = "onCreate",
  OnDelete = "onDelete",
  OnUpdate = "onUpdate",
  OnWrite = "onWrite",
}

export function registerFirestore(name: string) {
  return send({
    functions: {
      name,
      type: FunctionType.Firestore,
    },
  });
}
