import * as runtime from '../runtime';

class UserWrapper {
  #name: string;
  #userId: string

  constructor(name: string, userId: string) {
    this.#name = name;
    this.#userId = userId;
  }

  withData(d: Object) {
    return runtime.functions.sendAuthCreateUserInfo(this.#name, this.#userId, d);
  }
}

class AuthFunction {
  #name: string;
  constructor(name: string) { this.#name = name; }

  createUser(userId: string) {
    return new UserWrapper(this.#name, userId);
  }

  deleteUser(userId: string) {
    return runtime.functions.sendAuthDeleteUserInfo(this.#name, userId);
  }

  triggerWithProdUser(userId: string) {
    return runtime.functions.sendAuthCreateUserInfo(this.#name, userId);
  }
}

function add(name: string) {
  return runtime.functions.registerAuth(name);
}

function auth(name: string) {
  return new AuthFunction(name);
}

auth.add = add;
export default auth;