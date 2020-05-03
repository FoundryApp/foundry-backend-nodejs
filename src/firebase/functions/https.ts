import * as runtime from '../runtime'
import { registerFunction, getRegisteredFunction, FirebaseHttpsFunction } from '../shared';


enum HttpsMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Options = "OPTIONS",
}

interface HttpsConfig {
  route?: string;
  data: Object;
}
class HttpsFunction extends FirebaseHttpsFunction {
  constructor(name: string) { super(name); }

  trigger() {
    return {
      get: (payload: HttpsConfig) => {
        return runtime.functions.sendHttpsInfo(this.name, HttpsMethod.Get, payload.data, payload.route);
      },

      post: (payload: HttpsConfig) => {
        return runtime.functions.sendHttpsInfo(this.name, HttpsMethod.Post, payload.data, payload.route);
      },

      put: (payload: HttpsConfig) => {
        return runtime.functions.sendHttpsInfo(this.name, HttpsMethod.Put, payload.data, payload.route);
      },

      delete: (payload: HttpsConfig) => {
        return runtime.functions.sendHttpsInfo(this.name, HttpsMethod.Delete, payload.data, payload.route);
      },

      options: (payload: HttpsConfig) => {
        return runtime.functions.sendHttpsInfo(this.name, HttpsMethod.Options, payload.data, payload.route);
      },
    };
  }
}

export default {
  register: (name: string) => {
    const f = new HttpsFunction(name);
    registerFunction(name, f);
    runtime.functions.registerHttps(name);
    return f;
  },
  get: (name: string) => {
    return getRegisteredFunction(name) as HttpsFunction;
  },
};
