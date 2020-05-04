import * as runtime from '../runtime';
import { registerFunction, getRegisteredFunction, FirebaseHttpsFunction } from '../shared';


type HttpsCallablePayload = Object;

class HttpsCallableFunction extends FirebaseHttpsFunction {
  constructor(name: string) { super(name); }

  trigger() {
    return {
      onCall: (payload?: HttpsCallablePayload) => {
        return runtime.functions.sendHttpsCallableInfo(this.name, payload ?? {})
      },
    };
  }

  triggerAsUser(userId: string) {
    return {
      onCall: (payload?: HttpsCallablePayload) => {
        return runtime.functions.sendHttpsCallableInfoAsUser(this.name, userId, payload ?? {})
      },
    };
  }
}

export default {
  register: (name: string) => {
    const f = new HttpsCallableFunction(name);
    registerFunction(name, f);
    runtime.functions.registerHttpsCallable(name);
    return f;
  },
  get: (name: string) => {
    return getRegisteredFunction(name) as HttpsCallableFunction;
  },
};

