import * as runtime from '../runtime'

enum HttpsMethod {
  Get = "GET",
  Post = "POST",
  Put = "PUT",
  Delete = "DELETE",
  Options = "OPTIONS",
}

class PayloadWrapper {
  #name: string;
  #method: HttpsMethod;
  #route: string;

  constructor(name: string, method: HttpsMethod, route: string) {
    this.#name = name;
    this.#method = method;
    this.#route = route;
  }

  async withPayload(p: Object) {
    // Send to runtime    
    await runtime.sendHttpsInfo(this.#name, this.#method, this.#route, p);
  }
}

class HttpsFunction {
  #name: string;

  constructor(name: string) { this.#name = name; }

  get(route: string) {
    return new PayloadWrapper(this.#name, HttpsMethod.Get, route);
  }

  post(route: string) {
    return new PayloadWrapper(this.#name, HttpsMethod.Post, route);
  }

  put(route: string) {
    return new PayloadWrapper(this.#name, HttpsMethod.Put, route);
  }

  delete(route: string) {
    return new PayloadWrapper(this.#name, HttpsMethod.Delete, route);
  }

  options(route: string) {
    return new PayloadWrapper(this.#name, HttpsMethod.Options, route);
  }
}

async function add(name: string) {
  await runtime.registerHttpsFunction(name, runtime.FunctionType.Https);
}

function https(name: string) {
  return new HttpsFunction(name);
}

https.add = add;
export default https;