import * as runtime from '../runtime'
import { registerFunction, getRegisteredFunction, FirebaseHttpsFunction } from '../shared';


enum HttpsMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Options = "OPTIONS",
}

interface HttpsPayload {
  route: string;
  data: Object;
}
class HttpsFunction extends FirebaseHttpsFunction {
  constructor(name: string) { super(name); }

  trigger() {
    return {
      get: (payload: HttpsPayload) => {
        return runtime.functions.sendHttpsInfo(this.name, HttpsMethod.Get, payload.route, payload.data);
      },

      post: (payload: HttpsPayload) => {
        return runtime.functions.sendHttpsInfo(this.name, HttpsMethod.Post, payload.route, payload.data);
      },

      put: (payload: HttpsPayload) => {
        return runtime.functions.sendHttpsInfo(this.name, HttpsMethod.Put, payload.route, payload.data);
      },

      delete: (payload: HttpsPayload) => {
        return runtime.functions.sendHttpsInfo(this.name, HttpsMethod.Delete, payload.route, payload.data);
      },

      options: (payload: HttpsPayload) => {
        return runtime.functions.sendHttpsInfo(this.name, HttpsMethod.Options, payload.route, payload.data);
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
