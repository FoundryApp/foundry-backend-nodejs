import * as runtime from '../runtime';

class PayloadWrapper {
  #name: string;
  #userId: string;

  constructor(name: string, userId: string) {
    this.#name = name;
    this.#userId = userId;
  }

  withPayload(p: Object) {
    return runtime.functions.sendHttpsCallableInfo(this.#name, this.#userId, p);
  }
}

class HttpsCallableFunction {
  #name: string;

  constructor(name: string) { this.#name = name; }

  asUser(userId: string) {
    return new PayloadWrapper(this.#name, userId);
  }
}

function add(name: string) {
  return runtime.functions.registerHttpsCallable(name)
}

function httpsCallable(name: string) {
  return new HttpsCallableFunction(name);
}

httpsCallable.add = add;
export default httpsCallable;
