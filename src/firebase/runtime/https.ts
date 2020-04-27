import { send, FunctionType } from './shared';

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
