let config: any[] = [];

export enum FunctionType {
  Https = "https",
  HttpsCallable = "httpsCallable",
  Auth = "auth",
  Firestore = "firestore",
  RealtimeDB = "realtimeDB",
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
