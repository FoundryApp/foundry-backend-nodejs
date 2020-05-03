let config: any[] = [];
let registered: { [name: string]: FirebaseFunction } = {};

type FirebaseFunction = FirebaseBackgroundFunction | FirebaseHttpsFunction;

export function registerFunction(name: string, func: FirebaseFunction) {
  if (registered[name]) {
    throw new Error(`Function with the name '${name}' is already registered`);
  }
  registered[name] = func;
}

export function getRegisteredFunction(name: string) {
  if (!registered[name]) {
    throw new Error(`Function with the name '${name}' isn't registered`);
  }
  return registered[name];
}

export abstract class FirebaseBackgroundFunction {
  protected name: string;
  constructor(name: string) { this.name = name; }

  abstract trigger(): void;
  abstract triggerWithProdData(): void;
}

export abstract class FirebaseHttpsFunction {
  protected name: string;
  constructor(name: string) { this.name = name; }

  abstract trigger(): void;
}


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
  registered = {};
}
