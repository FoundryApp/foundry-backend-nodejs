import * as runtime from '../runtime';
import { registerFunction, getRegisteredFunction, FirebaseBackgroundFunction } from '../shared';

interface FirebaseUser {
  uid: string;
  data: Object;
}

class AuthFunction extends FirebaseBackgroundFunction {
  constructor(name: string) { super(name); }

  triggerWithProdData() {
    return {
      onCreate: (userId: string) => {
        return runtime.functions.sendAuthCreateUserInfo(this.name, userId);
      },
    };
  }

  trigger() {
    return {
      onCreate: (user: FirebaseUser) => {
        return runtime.functions.sendAuthCreateUserInfo(this.name, user.uid, user.data);
      },
      onDelete: (userId: string) => {
        return runtime.functions.sendAuthDeleteUserInfo(this.name, userId);
      },
    };
  }
}

export default {
  register: (name: string) => {
    const f = new AuthFunction(name);
    registerFunction(name, f);
    runtime.functions.registerAuth(name);
    return f;
  },
  get: (name: string) => {
    return getRegisteredFunction(name) as AuthFunction;
  },
};
